export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function run(file: File, crop: CropRect, onProgress?: (pct: number) => void): Promise<Blob> {
  onProgress?.(10);
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(crop.width);
  canvas.height = Math.round(crop.height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
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
