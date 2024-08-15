<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const MIN_WIDTH = 120;

let ths: HTMLTableCellElement[] = [];
let inBarRange: HTMLTableCellElement | undefined;
let pressed = false;

function mouseMoveHandle(event: MouseEvent) {
  if (!pressed) {
    if (!event.target) return;
    inBarRange = ths.find(
      (th) => Math.abs(th.offsetLeft + th.offsetWidth - event.clientX) < 10,
    );
    document.body.style.cursor = inBarRange ? "col-resize" : "";
    document.body.style.userSelect = inBarRange ? "none" : "";
  }

  if (!pressed || !inBarRange) return;

  const nextTh = ths[ths.indexOf(inBarRange) + 1];
  const inBarRangeDiff =
    inBarRange.offsetWidth - (event.clientX - inBarRange.offsetLeft);

  if (inBarRangeDiff < 0 && nextTh.offsetWidth + inBarRangeDiff < MIN_WIDTH)
    return;
  if (inBarRangeDiff > 0 && inBarRange.offsetWidth - inBarRangeDiff < MIN_WIDTH)
    return;

  // Предотвращение слишком маленького последнего th
  // Prevent the last th from becoming too small
  if (
    inBarRangeDiff < 0 &&
    ths.indexOf(nextTh) === ths.length - 1 &&
    nextTh.offsetWidth < MIN_WIDTH + 50
  )
    return;

  nextTh.style.width = `${nextTh.offsetWidth + inBarRangeDiff}px`;
  inBarRange.style.width = `${event.clientX - inBarRange.offsetLeft}px`;
}

function mouseDownHandle() {
  if (!inBarRange) return;
  pressed = true;
}

function mouseUpHandle() {
  pressed = false;
}

function resetCursor() {
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

onMounted(() => {
  const table = document.querySelector("table");
  if (!table) return;

  const selectedThs = Array.from(table.querySelectorAll("th"));
  ths = selectedThs;

  for (let i = 0; i < ths.length - 1; i++) {
    ths[i].style.width = `${ths[i].offsetWidth}px`;
  }

  table.addEventListener("mousemove", mouseMoveHandle);
  table.addEventListener("mousedown", mouseDownHandle);
  table.addEventListener("mouseup", mouseUpHandle);
  table.addEventListener("mouseleave", resetCursor);
});

onUnmounted(() => {
  const table = document.querySelector("table");
  if (!table) return;

  table.removeEventListener("mousemove", mouseMoveHandle);
  table.removeEventListener("mousedown", mouseDownHandle);
  table.removeEventListener("mouseup", mouseUpHandle);
  table.removeEventListener("mouseleave", resetCursor);
});
</script>
<template>
  <table>
    <slot />
  </table>
</template>
<style scoped>
table {
  position: relative;

  min-width: 100vw;
  overflow: hidden;

  border-collapse: collapse;
  table-layout: fixed;
}

table :deep(tr) {
  position: relative;
}

table :deep(th) {
  color: #999;
  white-space: nowrap;
  text-align: left;
}

table :deep(th),
table :deep(td) {
  min-width: v-bind(MIN_WIDTH) px;
  text-overflow: ellipsis;
  overflow: hidden;
  height: max-content;

  /*
    min-vw: 22.5rem
    max-vw: 50.625rem
    min-font-size: 0.625rem
    max-font-size: 0.875rem
  */
  font-size: clamp(0.625rem, 0.425rem + 0.8889vw, 0.875rem);
}

table :deep(th),
table :deep(td) {
  padding: 2rem 1.5rem;
  border: 0.0625rem solid #333;
}

table :deep(th:first-child),
table :deep(td:first-child) {
  border-left: none !important;
}

table :deep(th:last-child),
:deep(td:last-child) {
  border-right: none !important;
}
</style>
