<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from "vue";
const props = defineProps<{
  type: string;
  groupNumbers?: boolean;
  maxLength?: number;
}>();
const inputRef = ref<HTMLInputElement | null>(null);

function handleInput(event: Event) {
  if (props.type !== "number") return;
  const target = event.target as HTMLInputElement;

  // Заменяем все нецифровые символы на пустую строку,
  // оставляя только цифры.
  // Replace non-digit characters with empty string,
  // essentially leaving only numbers.
  const integer = target.value
    .substring(0, props.maxLength ?? 11)
    .replace(/\D/g, "");

  // Разделяем по 3 цифры в группы
  // Separate by 3 digits in groups
  // E.g.: 1200000 -> 1 200 000
  target.value = props.groupNumbers
    ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : integer;
}

function handleDisallowedKeys(event: KeyboardEvent) {
  if (props.type !== "number") return;
  if (event.key === " ") {
    event.preventDefault();
  }
}

onMounted(() => {
  inputRef.value?.addEventListener("input", handleInput);
  inputRef.value?.addEventListener("keydown", handleDisallowedKeys);
});

onUnmounted(() => {
  inputRef.value?.removeEventListener("input", handleInput);
  inputRef.value?.removeEventListener("keydown", handleDisallowedKeys);
});
</script>
<template>
  <input ref="inputRef" />
</template>
<style scoped>
input {
  width: 100%;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;

  background-color: transparent;
  outline: none;
  border: 0.0625rem solid #222;
  color: inherit;
  font-family: inherit;

  border-radius: 0.25rem;
  transition: border-color 0.25s;
}

input:focus {
  border-color: #444;
  transition: border-color 0.25s;
}
</style>
