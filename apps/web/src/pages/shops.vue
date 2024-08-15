<script setup lang="ts">
import Shops from "../components/Shops.vue";
import ShopsAdd from "../components/ShopsAdd.vue";
</script>
<template>
  <div class="center">
    <Shops />
    <ShopsAdd />
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
