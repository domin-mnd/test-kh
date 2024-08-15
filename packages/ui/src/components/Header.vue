<script setup lang="ts"></script>

<template>
  <header>
    <slot />
  </header>
</template>
<style scoped>
header {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 1.5rem 2rem;

  background: linear-gradient(black, transparent);

  user-select: none;
}

header :deep(a) {
  position: relative;
  z-index: 3;

  color: white;
  font-size: 0.875rem;
}

header :deep(a):link {
  text-decoration: none;
}

header :deep(a):visited {
  color: white;
}
</style>
