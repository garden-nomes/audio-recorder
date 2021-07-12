<template>
  <recorder />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Recorder from "./components/Recorder.vue";

export default defineComponent({
  name: "App",
  components: { Recorder },
});
</script>

<style>
#app {
  height: 100vh;
}
</style>
