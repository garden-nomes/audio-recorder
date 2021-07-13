<template>
  <div :class="`state-${timerState}`" class="record-timer">
    {{ formattedDisplayTime }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// simple timer component: takes a startTime and endTime and displays the difference between them,
// updating continuously if endTime is null
export default defineComponent({
  name: "RecordTimer",

  props: {
    startTime: { type: Date, default: null },
    stopTime: { type: Date, default: null },
  },

  data() {
    return {
      displayTime: 0, // display time in milliseconds
      timer: null as number | null, // setInterval timer id
    };
  },

  computed: {
    timerState(): string {
      if (this.startTime === null && this.stopTime === null) {
        return "initial";
      } else if (this.stopTime === null) {
        return "started";
      } else {
        return "stopped";
      }
    },

    formattedDisplayTime(): string {
      const seconds = this.displayTime * 0.001;
      return `${seconds.toFixed(2).padStart(5, "0")}`;
    },
  },

  watch: {
    timerState(state: string) {
      if (state === "started") {
        this.startUpdating();
      } else if (state === "stopped") {
        this.stopUpdating();
      } else if (state === "initial") {
        this.displayTime = 0;
      }
    },
  },

  methods: {
    startUpdating() {
      // start updating display time every tenth of a second
      this.timer = setInterval(() => {
        this.displayTime = this.getCurrentTime();
      }, 10);
    },

    stopUpdating() {
      // stop updating display time
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
        this.displayTime = this.getCurrentTime();
      }
    },

    // current run time in milliseconds
    getCurrentTime(): number {
      if (this.startTime === null) {
        return 0;
      } else if (this.stopTime === null) {
        return Date.now() - this.startTime.getTime();
      } else {
        return this.stopTime.getTime() - this.startTime.getTime();
      }
    },
  },
});
</script>

<style>
.record-timer {
  font-size: 8rem;
  letter-spacing: -0.5rem;
  color: #999;
}

.record-timer.state-started,
.record-timer.state-stopped {
  color: #333;
}
</style>
