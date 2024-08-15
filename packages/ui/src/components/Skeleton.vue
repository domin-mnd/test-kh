<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  width: number;
  height: number;
}>();

const width = `${props.width}px`;
const height = `${props.height}px`;
</script>
<template>
  <div class="skeleton" />
</template>
<style scoped>
.skeleton {
  width: v-bind(width);
  height: v-bind(height);
  background-color: #111;
  border-radius: 0.25rem;
  animation: skeleton-loading 1.5s infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: #111;
  }
  100% {
    background-color: #333;
  }
}
</style>
