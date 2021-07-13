<template>
  <button
    :disabled="recording === null"
    class="play-button"
    type="button"
    @click="isPlaying ? stopAudio() : playAudio(recording)"
  >
    {{ isPlaying ? "stop" : "play" }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useAudioPlayer from "@/composables/use-audio-player";

export default defineComponent({
  name: "PlayButton",

  props: {
    recording: {
      type: Blob as PropType<Blob | null>,
      default: null,
    },
  },

  setup() {
    return useAudioPlayer();
  },
});
</script>

<style>
.play-button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.play-button:not(:disabled) {
  color: #6da34d;
  border-color: #6da34d;
}

.play-button:hover:not(:disabled),
.play-button:active:not(:disabled) {
  background: #6da34d;
  border-color: #6da34d;
  color: #fff;
}

.play-button:disabled {
  border-color: #999;
  color: #999;
  cursor: initial;
}
</style>
