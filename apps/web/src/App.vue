<script setup lang="ts">
import { Layout, Header } from "@repo/ui";
</script>
<template>
  <Layout>
    <template #header>
      <Header>
        <RouterLink to="/">Тестовое задание</RouterLink>
      </Header>
    </template>
    <RouterView />
  </Layout>
</template>
