<template>
  <button
    :class="{ isRecording }"
    :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["start", "stop"],
});
</script>

<style>
.record-button {
  font-size: 1rem;
  padding: 1.5rem 3rem;
  width: 20rem;
  border-radius: 10rem;
  transition: 150ms background, 150ms color, 150ms border-color,
    150ms box-shadow ease;
}

.record-button:not(:disabled) {
  color: #7b0d1e;
  border-color: #7b0d1e;
}

.record-button:hover:not(:disabled) {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2), 0 0 8px rgba(159, 32, 66, 0.3);
  border-color: #9f2042;
  color: #9f2042;
  background: none;
}

.record-button.isRecording:not(:disabled) {
  background: #7b0d1e;
  border-color: #7b0d1e;
  color: #fff;
}
</style>
