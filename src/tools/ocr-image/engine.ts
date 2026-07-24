import { createWorker } from "tesseract.js";

/**
 * Extracts text from an image using Tesseract.js, which runs as WASM
 * inside a Web Worker — the image never leaves the browser. Worker, core,
 * and language-data assets are self-hosted under /tesseract (rather than
 * the library's default jsdelivr CDN) so this has zero third-party
 * dependency and works in network-restricted environments too. The
 * language file is cached by the browser after first use.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<string> {
  const worker = await createWorker("eng", 1, {
    workerPath: "/tesseract/worker.min.js",
    corePath: "/tesseract/tesseract-core-simd-lstm.wasm.js",
    langPath: "/tesseract",
    gzip: true,
    logger: (m) => {
      if (m.status === "recognizing text" && typeof m.progress === "number") {
        onProgress?.(Math.round(m.progress * 100));
      }
    },
  });

  try {
    const {
      data: { text },
    } = await worker.recognize(file);
    return text;
  } finally {
    await worker.terminate();
  }
}
