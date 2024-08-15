<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps<{
  width?: number;
  height?: number;
  src: string;
  href: string;
  title: string;
}>();

const width = props.width ? `${props.width}%` : "100%";
const height = props.height ? `${props.height}vw` : "30vw";
const src = `url(${props.src})`;
</script>
<template>
  <a class="card-link" :href="props.href" v-if="/^http/.test(props.href)">
    {{ title }}
  </a>
  <RouterLink class="card-link" :to="props.href" v-else>
    {{ title }}
  </RouterLink>
</template>
<style scoped>
.card-link {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: end;

  width: v-bind(width);
  height: v-bind(height);
  padding: 1.5rem;

  font-size: 3rem;
  letter-spacing: -0.125rem;
  color: white;
  text-decoration: none;
}

.card-link:before {
  position: absolute;
  z-index: -1;
  display: block;
  left: 0;
  top: 0;
  content: "";
  overflow: hidden;

  width: 100%;
  height: 100%;

  background-image: v-bind(src);
  background-size: cover;

  opacity: 0;
  filter: blur(1rem);
  transition: all 0.6s;
}

.card-link:hover::before {
  opacity: 0.4;
  filter: blur(0);
  transition: all 0.6s;
}

@media screen and (max-width: 68.75rem) {
  .card-link {
    width: 100%;
    height: 30vh;
  }
}
</style>
