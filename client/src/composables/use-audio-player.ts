import { onBeforeUnmount, ref } from "vue";

export default function useAudioPlayer() {
  const audio = new Audio();
  const isPlaying = ref(false);

  audio.onended = () => {
    isPlaying.value = false;
  };

  const playAudio = (blob: Blob) => {
    audio.src = URL.createObjectURL(blob);
    audio.play();
    isPlaying.value = true;
  };

  const stopAudio = () => {
    audio.pause();
    isPlaying.value = false;
  };

  onBeforeUnmount(() => {
    audio.pause();
  });

  return { playAudio, stopAudio, isPlaying };
}
