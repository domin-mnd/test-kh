<script setup lang="ts">
import { Modal, Input, Label } from "@repo/ui";
import PlusIcon from "../components/PlusIcon.vue";
import { ref } from "vue";
import { type GetShops, useFetch } from "../composables/useFetch";
import { useCarsStore } from "../store/cars";

const createModalRef = ref<null | InstanceType<typeof Modal>>(null);

const { addCar } = useCarsStore();
const { data: shops, isLoading } = useFetch<GetShops>("/v1/shop");

async function createCar() {
  const form = document.querySelector("form");
  if (!form) return;

  const formData = new FormData(form);
  const dataEntries = Object.fromEntries(formData.entries()) as unknown as {
    brand: string;
    model: string;
    price: string;
    shop_id: string;
  };

  const data = {
    brand: dataEntries.brand,
    model: dataEntries.model,
    // "1 200 000" -> "1200000" -> 1200000
    price: Number(dataEntries.price.replace(/ /g, "")),
    shop_id: Number(dataEntries.shop_id),
  };

  const foundShop = shops.value?.find((shop) => shop.id === data.shop_id);
  if (!foundShop) return;

  await addCar(data, foundShop.name, foundShop.phone_number);
  createModalRef.value.toggleModal();
}

function toggleModal() {
  createModalRef.value.toggleModal();
}
</script>
<template>
  <div class="add-new" @click="toggleModal">
    <PlusIcon />
  </div>
  <Modal title="Добавление автомобиля" ref="createModalRef">
    <form>
      <Label>Марка</Label>
      <Input placeholder="BMW" name="brand" />
      <Label>Модель</Label>
      <Input placeholder="5 G60" name="model" />
      <Label>Стоимость</Label>
      <Input placeholder="7 278 000" name="price" type="number" group-numbers />
      <Label>Магазин</Label>
      <Select name="shop_id">
        <option value="" disabled v-if="isLoading">
          Пожалуйста, подождите...
        </option>
        <option v-else v-for="shop in shops" :key="shop.id" :value="shop.id">
          {{ shop.name }}
        </option>
      </Select>
    </form>
    <template #actions>
      <button @click="toggleModal" data-type="secondary">Закрыть</button>
      <button @click="createCar" data-type="primary">Создать</button>
    </template>
  </Modal>
</template>
<style scoped>
.add-new {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 1.5625rem;

  background-color: transparent;
  color: #444;

  cursor: pointer;
  transition: all 0.6s;
}

.add-new:hover {
  background-color: #111;
  color: #333;
  transition: all 0.6s;
}

.add-new svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
