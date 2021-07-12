<template>
  <div class="recorder">
    <record-timer />

    <record-button
      :is-recording="isRecording"
      @start="startRecording"
      @stop="stopRecording"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecordButton from "./RecordButton.vue";
import RecordTimer from "./RecordTimer.vue";

export default defineComponent({
  name: "Recorder",
  components: { RecordButton, RecordTimer },
  data() {
    return {
      isRecording: false,
    };
  },
  methods: {
    startRecording() {
      this.isRecording = true;
    },
    stopRecording() {
      this.isRecording = false;
    },
  },
});
</script>

<style scoped>
.recorder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
