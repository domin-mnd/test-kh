<script setup lang="ts">
import Cars from "../components/Cars.vue";
import CarsAdd from "../components/CarsAdd.vue";
</script>
<template>
  <div class="center">
    <Cars />
    <CarsAdd />
  </div>
</template>
<style scoped>
.center {
  display: flex;
  flex-direction: column;
  width: max-content;

  padding: 5rem 0;
}
</style>
