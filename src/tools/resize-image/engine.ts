export interface ResizeImageOptions {
  width: number;
  height: number;
  maintainAspect: boolean;
}

export async function run(
  file: File,
  options: ResizeImageOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  onProgress?.(10);
  const img = await loadImage(file);
  let { width, height } = options;

  if (options.maintainAspect) {
    const ratio = img.naturalWidth / img.naturalHeight;
    if (width / height > ratio) {
      width = Math.round(height * ratio);
    } else {
      height = Math.round(width / ratio);
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);
  onProgress?.(80);

  const type = file.type === "image/png" ? "image/png" : "image/jpeg";
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => {
        onProgress?.(100);
        return b ? resolve(b) : reject(new Error("export failed"));
      },
      type,
      0.92
    )
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
