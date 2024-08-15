<script setup lang="ts">
import { defineProps, defineExpose, ref } from "vue";

const visible = ref<boolean>(false);

const props = defineProps<{
  title: string;
  onClose?: () => void;
}>();

function toggleModal() {
  if (visible.value) props.onClose?.();
  visible.value = !visible.value;
}

defineExpose({
  toggleModal,
  visible,
});
</script>
<template>
  <Teleport to="body">
    <div class="modal-wrapper" :data-active="visible">
      <div class="modal">
        <h1>{{ props.title }}</h1>
        <div class="modal-content">
          <slot />
        </div>
        <div class="modal-actions">
          <slot name="actions">
            <button @click="toggleModal" data-type="secondary">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  margin-top: -5rem;
  transition: margin-top 0.25s;

  width: 100%;
  max-width: 37.5rem;
  padding: 1.5rem;
  border-radius: 1rem;

  background-color: black;
  color: white;
  border: 0.0625rem solid #222;
}

.modal-wrapper[data-active="true"] .modal {
  margin-top: 0;
  transition: margin-top 0.25s;
}

.modal > h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;

  background-color: #090909;
  border-top: 0.0625rem solid #222;

  padding: 1rem;
  margin: 1.5rem -1.5rem -1.5rem -1.5rem;
}

.modal-actions :deep(button[data-type="secondary"]) {
  background-color: #080808;
  border: 0.0625rem solid #222;
  color: white;

  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  cursor: pointer;
  transition: background-color 0.25s;
}

.modal-actions :deep(button[data-type="secondary"]:hover) {
  background-color: #111;

  transition: background-color 0.25s;
}

.modal-actions :deep(button[data-type="primary"]) {
  background-color: white;
  color: black;
  border: none;

  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  cursor: pointer;
  transition: opacity 0.25s;
}

.modal-actions :deep(button[data-type="primary"]:hover) {
  opacity: 0.8;

  transition: opacity 0.25s;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;

  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem;

  background-color: rgba(0, 0, 0, 0.5);

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}

.modal-wrapper[data-active="true"] {
  opacity: 1;
  pointer-events: all;
  transition: opacity 0.25s;
}
</style>
