<template>
  <div class="recorder">
    <record-timer />
    <record-button />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecordButton from "./RecordButton.vue";
import RecordTimer from "./RecordTimer.vue";

export default defineComponent({
  name: "Recorder",
  components: { RecordButton, RecordTimer },
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
