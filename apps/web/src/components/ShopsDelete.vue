<script setup lang="ts">
import { useShopsStore } from "../store/shops";
import TrashBinIcon from "./TrashBinIcon.vue";
import { defineProps } from "vue";

const props = defineProps<{
  shopId: number;
}>();

const { deleteShop } = useShopsStore();

function handleDelete() {
  deleteShop(props.shopId);
}
</script>
<template>
  <div class="trash" @click="handleDelete">
    <TrashBinIcon />
  </div>
</template>
<style scoped>
.trash {
  position: absolute;
  top: 50%;
  right: -1rem;
  line-height: 0;
  transform: translateY(-50%);

  color: #333;
  transition: color 0.25s;

  cursor: pointer;
}

.trash:hover {
  color: #555;
  transition: color 0.25s;
}

.trash svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
