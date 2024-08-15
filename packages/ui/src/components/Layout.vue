<template>
  <div class="wrapper">
    <slot name="header"></slot>
    <main>
      <slot />
    </main>
    <slot name="footer"></slot>
  </div>
</template>
<style scoped>
.wrapper {
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: auto;
}

.wrapper > * {
  width: 100%;
}

main {
  min-height: 100vh;
  background-color: black;
  color: white;
}
</style>
<style>
:root {
  --primary: black;
  color-scheme: dark;
}

::selection {
  background-color: white;
  color: black;
}

body {
  background-color: black;
}

* {
  font-family: "Inter Variable", sans-serif;
  font-weight: 500;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
