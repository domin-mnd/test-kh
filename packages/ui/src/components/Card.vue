<script setup lang="ts">
const props = defineProps<{
  width?: number;
  height?: number;
  label: string;
}>();

const width = props.width ? `${props.width}%` : "100%";
const height = props.height ? `${props.height}vw` : "30vw";
</script>
<template>
  <div class="card">
    <span>
      {{ label }}
    </span>
    <span>
      <slot />
    </span>
  </div>
</template>
<style scoped>
.card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: v-bind(width);
  height: v-bind(height);
  padding: 1.5rem;
}

.card span {
  font-size: 2.25rem;
  letter-spacing: -0.125rem;
  line-height: 0.9;
  color: white;
}

.card span:nth-child(2) {
  /*
    min-vw: 23.125rem
    max-vw: 46.875rem
    min-font-size: 1.2rem
    max-font-size: 2.25rem
  */
  font-size: clamp(1.2rem, 0.1776rem + 4.4211vw, 2.25rem);
}

@media screen and (max-width: 68.75rem) {
  .card {
    width: 100%;
    height: 30vh;
  }
}
</style>
