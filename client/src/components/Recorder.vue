<template>
  <div class="recorder">
    <record-timer :start-time="startTime" :stop-time="stopTime" />

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
      startTime: null as Date | null,
      stopTime: null as Date | null,
    };
  },
  methods: {
    startRecording() {
      this.isRecording = true;
      this.startTime = new Date();
      this.stopTime = null;
    },
    stopRecording() {
      this.isRecording = false;
      this.stopTime = new Date();
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
