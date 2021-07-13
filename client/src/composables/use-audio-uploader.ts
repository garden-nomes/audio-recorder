import Api from "@/lib/api";
import { inject, ref } from "vue";

// Vue composable that tracks the request state and response for the "postBlob" api call
export default function useAudioUploader() {
  // retrieve global API instance using provide/inject
  const api = inject("api") as Api;

  // request state flags
  const isUploading = ref(false);
  const isUploadError = ref(false);

  // response from the last successful POST request
  const uploadFilename = ref(null as string | null);
  const uploadPath = ref(null as string | null);

  // post an audio blob to the API
  const uploadAudio = async (audio: Blob) => {
    isUploading.value = true;
    isUploadError.value = false;
    uploadFilename.value = null;

    try {
      const { filename, basename } = await api.postBlob(audio);
      uploadFilename.value = basename;
      uploadPath.value = filename;
    } catch (err) {
      isUploadError.value = true;
    }

    isUploading.value = false;
  };

  // return everything to the original state
  const resetUploadStatus = () => {
    isUploading.value = false;
    isUploadError.value = false;
    uploadFilename.value = null;
  };

  return {
    uploadAudio,
    resetUploadStatus,
    isUploading,
    isUploadError,
    uploadFilename,
    uploadPath,
  };
}
