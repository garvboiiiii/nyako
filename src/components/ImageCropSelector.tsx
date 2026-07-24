import { useRef, useState } from "react";

export interface FractionalRect {
  x: number; // 0-1, left edge as a fraction of image width
  y: number; // 0-1, top edge as a fraction of image height
  width: number; // 0-1
  height: number; // 0-1
}

interface ImageCropSelectorProps {
  file: File;
  rect: FractionalRect;
  onChange: (rect: FractionalRect) => void;
  /** Lock width/height ratio while resizing (used by Passport Photo presets) */
  lockAspect?: number;
}

const MIN_SIZE = 0.06;

export default function ImageCropSelector({ file, rect, onChange, lockAspect }: ImageCropSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgUrl] = useState(() => URL.createObjectURL(file));
  const dragState = useRef<{ mode: "move" | "resize"; startX: number; startY: number; startRect: FractionalRect } | null>(null);

  function toFraction(clientX: number, clientY: number) {
    const box = containerRef.current!.getBoundingClientRect();
    return { fx: (clientX - box.left) / box.width, fy: (clientY - box.top) / box.height };
  }

  function startDrag(mode: "move" | "resize") {
    return (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as Element).setPointerCapture(e.pointerId);
      const { fx, fy } = toFraction(e.clientX, e.clientY);
      dragState.current = { mode, startX: fx, startY: fy, startRect: rect };
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current) return;
    const { fx, fy } = toFraction(e.clientX, e.clientY);
    const { mode, startX, startY, startRect } = dragState.current;
    const dx = fx - startX;
    const dy = fy - startY;

    if (mode === "move") {
      const x = clamp(startRect.x + dx, 0, 1 - startRect.width);
      const y = clamp(startRect.y + dy, 0, 1 - startRect.height);
      onChange({ ...startRect, x, y });
    } else {
      let width = clamp(startRect.width + dx, MIN_SIZE, 1 - startRect.x);
      let height = lockAspect ? width / lockAspect : clamp(startRect.height + dy, MIN_SIZE, 1 - startRect.y);
      if (lockAspect && startRect.y + height > 1) {
        height = 1 - startRect.y;
        width = height * lockAspect;
      }
      onChange({ ...startRect, width, height });
    }
  }

  function endDrag() {
    dragState.current = null;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none touch-none rounded-lg overflow-hidden border border-line bg-paper"
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <img src={imgUrl} alt="" className="w-full h-auto block pointer-events-none" draggable={false} />
      <div
        className="absolute border-2 border-primary bg-primary/10 cursor-move"
        style={{
          left: `${rect.x * 100}%`,
          top: `${rect.y * 100}%`,
          width: `${rect.width * 100}%`,
          height: `${rect.height * 100}%`,
        }}
        onPointerDown={startDrag("move")}
      >
        <div
          className="absolute -right-2 -bottom-2 w-5 h-5 rounded-full bg-primary border-2 border-white shadow cursor-nwse-resize touch-none"
          onPointerDown={startDrag("resize")}
          aria-label="Resize crop area"
        />
      </div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
