<script setup lang="ts">
const props = defineProps<{
  mobileReversed?: boolean;
}>();

const direction = props.mobileReversed ? "column-reverse" : "column";
</script>
<template>
  <div class="stack">
    <slot />
  </div>
</template>
<style scoped>
.stack {
  display: flex;
}

.stack > * + * {
  border-left: 0.0625rem solid #555;
}

/* Не :global(.stack + .stack) из-за use-кейса компонента */
/* Not :global(.stack + .stack) because of stack nature */
.stack {
  border-bottom: 0.0625rem solid #555;
}

@media screen and (max-width: 68.75rem) {
  .stack {
    flex-direction: v-bind(direction);
    border-bottom: none;
  }

  .stack > * {
    border-left: none;
    border-bottom: 0.0625rem solid #555;
  }
}
</style>
