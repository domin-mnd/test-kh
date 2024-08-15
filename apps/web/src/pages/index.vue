<script setup lang="ts">
import { CardStack, CardLink, Card } from "@repo/ui";

const apiPort = import.meta.env.VITE_API_PORT;
</script>
<template>
  <CardStack mobile-reversed>
    <CardLink
      :width="40"
      :height="20"
      src="/github.jpg"
      href="https://github.com/domin-mnd/kh-test"
      title="GitHub"
    />
    <Card :width="60" :height="20" label="Примечание">
      Задание было выполнено вместе с <br />бонусной частью, спасибо за
      внимание.
    </Card>
  </CardStack>
  <CardStack>
    <CardLink
      :width="40"
      :height="20"
      src="/laptop-server.jpg"
      :href="`http://localhost:${apiPort}/v1/api-docs`"
      title="АПИ"
    />
    <CardLink
      :width="30"
      :height="20"
      src="/cheese-shop.jpg"
      href="/shops"
      title="Магазины"
    />
    <CardLink
      :width="30"
      :height="20"
      src="/classic-black-sports-car.jpg"
      href="/cars"
      title="Автомобили"
    />
  </CardStack>
</template>
