<template>
  <button
    :class="{ isRecording }"
    :disabled="disabled"
    class="record-button"
    type="button"
    @mousedown="$emit('start')"
    @mouseup="$emit('stop')"
  >
    hold to record
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
  transition: transform 100ms ease, box-shadow 100ms ease;
  transform: translateY(0px);
  font-size: 1.5rem;
  padding: 1.5rem 3rem;
  width: 24rem;
  border-radius: 10rem;
}

.record-button:not(:disabled) {
  color: #7b0d1e;
  border-color: #7b0d1e;
}

.record-button:not(:disabled):hover:not(:active) {
  transform: translateY(-4px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  background: none;
  border-color: #9f2042;
  color: #9f2042;
}

.record-button:not(:disabled):active {
  transition: none;
  background: #7b0d1e;
  border-color: #7b0d1e;
  color: #fff;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}
</style>
