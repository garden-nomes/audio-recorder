export default class Api {
  constructor(private baseUrl: string) {}

  // posts a blob to the API with the approriate "Content-Type"
  async postBlob(blob: Blob) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": blob.type },
      body: blob,
    });

    if (response.status >= 400) {
      throw new Error(`request failed with status ${response.status}`);
    }

    // API returns the filename of the saved audio as raw text
    return await response.text();
  }
}
