<template>
  <div class="recorder">
    <record-timer :start-time="startTime" :stop-time="stopTime" />

    <record-button
      :is-recording="isRecording"
      :disabled="!isReadyToRecord || !!recordedAudio"
      @start="startRecording"
      @stop="stopRecording"
    />

    <p v-if="isUploadError" class="status-text error">
      Unable to save recording
    </p>
    <p v-else-if="isUploading" class="status-text">Saving recording...</p>
    <p v-else-if="uploadFilename" class="status-text success">
      Recording saved to
      <span :title="uploadPath || ''" class="filename">
        {{ uploadFilename }}
      </span>
    </p>
    <p v-else class="status-text" aria-hidden="true">&nbsp;</p>

    <div class="play-reset-btns">
      <play-button :recording="recordedAudio" />

      <button
        :disabled="!recordedAudio || isUploading"
        class="reset-button"
        type="button"
        @click="reset"
      >
        reset
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMediaRecorder from "@/composables/use-media-recorder";
import useAudioUploader from "@/composables/use-audio-uploader";
import RecordButton from "./RecordButton.vue";
import RecordTimer from "./RecordTimer.vue";
import PlayButton from "./PlayButton.vue";

export default defineComponent({
  name: "Recorder",

  components: { RecordButton, RecordTimer, PlayButton },

  data() {
    return {
      isRecording: false,
      startTime: null as Date | null,
      stopTime: null as Date | null,
    };
  },

  setup() {
    return {
      ...useMediaRecorder(),
      ...useAudioUploader(),
    };
  },

  methods: {
    startRecording() {
      if (this.isReadyToRecord) {
        this.isRecording = true;
        this.startTime = new Date();
        this.stopTime = null;
        this.startMediaRecorder();
      }
    },

    stopRecording() {
      this.isRecording = false;
      this.stopTime = new Date();
      this.stopMediaRecorder();
    },

    reset() {
      this.startTime = null;
      this.stopTime = null;
      this.resetMediaRecorder();
      this.resetUploadStatus();
    },
  },

  watch: {
    // auto upload recording whenever `recordedAudio` changes to something other than null
    recordedAudio() {
      if (this.recordedAudio !== null) {
        this.uploadAudio(this.recordedAudio);
      }
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

.recorder > *:not(:last-child) {
  margin-bottom: 1rem;
}

.play-reset-btns {
  width: 20rem;
  display: flex;
  align-items: stretch;
}

.play-reset-btns > * {
  flex: 1;
}

.reset-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
}

.status-text {
  margin-top: 0;
  margin-bottom: 2rem !important;
  font-size: 0.75rem;
  color: #555;
}

.filename {
  text-decoration: underline;
  color: #333;
}
</style>
