// JSON structure of a POST response from the API
export interface ApiPostResponse {
  filename: string;
  basename: string;
}

export default class Api {
  // either supply an API url in the constructor, or default to an environment variable
  // (for dev environments, see "client/.env.development")
  constructor(private baseUrl: string = process.env.VUE_APP_API_BASE) {
    if (!this.baseUrl) {
      throw new Error("no baseUrl provided to the API");
    }
  }

  // posts a blob to the API with the approriate "Content-Type"
  async postBlob(blob: Blob): Promise<ApiPostResponse> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": blob.type },
      body: blob,
    });

    if (response.status >= 400) {
      throw new Error(`request failed with status ${response.status}`);
    }

    // API returns the filename of the saved audio as raw text
    return await response.json();
  }
}
