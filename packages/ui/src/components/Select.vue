<template>
  <select>
    <slot />
  </select>
</template>
<style>
select {
  width: 100%;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;

  background-color: black;
  outline: none;
  border: 0.0625rem solid #222;
  color: inherit;
  font-family: inherit;

  border-radius: 0.25rem;
  transition: border-color 0.25s;
}

select * {
  background-color: black;
  color: white;
}

select:focus {
  border-color: #444;
  transition: border-color 0.25s;
}
</style>
