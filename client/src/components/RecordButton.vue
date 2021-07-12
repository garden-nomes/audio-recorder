<template>
  <button
    :class="{ isRecording }"
    class="record-button"
    type="button"
    @mousedown="$emit('start')"
    @mouseup="$emit('stop')"
  >
    record
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecordButton",

  props: {
    isRecording: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["start", "stop"],
});
</script>

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
  position: relative;
  border: 2px solid #7b0d1e;
  font-size: 1rem;
  padding: 1.5rem 3rem;
  width: 20rem;
  color: #7b0d1e;
  border-radius: 10rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  transition: 150ms background, 150ms color, 150ms border-color,
    150ms box-shadow ease;
}

.record-button:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2), 0 0 8px rgba(159, 32, 66, 0.3);
  border-color: #9f2042;
  color: #9f2042;
}

.record-button.isRecording {
  background: #7b0d1e;
  border-color: #7b0d1e;
  color: #fff;
}
</style>
