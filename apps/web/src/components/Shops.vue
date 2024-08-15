<script setup lang="ts">
import { CardStack, Card } from "@repo/ui";
import { useShopsStore } from "../store/shops";
import ShopsDelete from "./ShopsDelete.vue";

const { data } = useShopsStore();

function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>
<template>
  <div v-for="shop in data" :key="shop.id" class="shop">
    <div class="shop-heading">
      <a :href="`tel:${shop.phone_number}`">
        <h2>{{ shop.name }}</h2>
      </a>
      <ShopsDelete :shop-id="shop.id" />
    </div>
    <CardStack>
      <Card
        v-for="car in shop.cars"
        :height="15"
        :width="100"
        :label="`${formatPrice(car.price)} ₽`"
      >
        <p>{{ car.model }}</p>
        <h2>{{ car.brand }}</h2>
      </Card>
    </CardStack>
  </div>
</template>
<style scoped>
.shop > .stack {
  overflow-x: auto;
  flex-direction: column;

  background-color: #090909;

  border-top: 0.0625rem solid #555;
  border-bottom: 0.0625rem solid #555 !important;
  width: 100vw;
  height: 25rem;
  max-height: 25rem;
  margin-bottom: 4rem;
}

.shop > .stack > * {
  min-height: 15rem;

  border-left: none;
  border-bottom: 0.0625rem solid #555;
}

.shop > .stack > *:last-child {
  border-bottom: none;
}

.shop > .shop-heading {
  position: relative;
  width: max-content;
  padding: 1.5rem;
}

.shop > .shop-heading a {
  color: white;

  transition: opacity 0.3s;
}

.shop > .shop-heading a:hover {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.shop :deep(.card span:first-child) {
  color: #888;
}

.shop :deep(.card h2) {
  font-weight: 600;
}
</style>
