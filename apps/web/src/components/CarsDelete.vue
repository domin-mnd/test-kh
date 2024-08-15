<script setup lang="ts">
import { useCarsStore } from "../store/cars";
import TrashBinIcon from "./TrashBinIcon.vue";
import { defineProps } from "vue";

const props = defineProps<{
  carId: number;
}>();

const { deleteCar } = useCarsStore();

function handleDelete() {
  deleteCar(props.carId);
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
  right: 1rem;
  line-height: 0;
  transform: translateY(-50%);

  color: transparent;
  transition: color 0.6s;

  cursor: pointer;
  pointer-events: none;
}

.trash:hover {
  color: #333 !important;
  transition: color 0.25s !important;
}

tr:hover .trash {
  color: #555;
  transition: color 0.6s;
  pointer-events: all;
}

.trash svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
