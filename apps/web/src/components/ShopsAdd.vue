<script setup lang="ts">
import { Modal, Input, Label } from "@repo/ui";
import PlusIcon from "../components/PlusIcon.vue";
import { ref } from "vue";
import { useShopsStore } from "../store/shops";

const createModalRef = ref<null | InstanceType<typeof Modal>>(null);

const { addShop } = useShopsStore();

async function createCar() {
  const form = document.querySelector("form");
  if (!form) return;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()) as unknown as {
    name: string;
    phone_number: string;
  };

  await addShop(data);
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
  <Modal title="Добавление магазина" ref="createModalRef">
    <form>
      <Label>Название</Label>
      <Input placeholder="Лавка" name="name" />
      <Label>Номер телефона</Label>
      <Input
        placeholder="79178348239"
        name="phone_number"
        type="number"
        :max-length="15"
      />
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

  width: 100vw;
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
