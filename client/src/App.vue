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
* {
  box-sizing: border-box;
}

#app {
  /* font stack from https://css-tricks.com/snippets/css/font-stacks/ */
  font-family: Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
    "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana,
    "Verdana Ref", sans-serif;
  font-size: 24px;
  height: 100vh;
}
</style>
