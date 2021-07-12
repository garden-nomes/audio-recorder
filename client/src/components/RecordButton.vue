<template>
  <button class="record-button" type="button">begin recording</button>
</template>

<style>
.record-button {
  /* button reset from https://moderncss.dev/css-button-styling-guide/ */
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  cursor: pointer;
  @media screen and (-ms-high-contrast: active) {
    border: 2px solid currentcolor;
  }

  /* custom styling */
  border: 2px solid #7b0d1e;
  font-size: 1rem;
  padding: 1.5rem 3rem;
  color: #7b0d1e;
  border-radius: 10rem;
  transition: 200ms background, 200ms color;
}

.record-button:hover {
  background: #7b0d1e;
  color: #fff;
}
</style>
