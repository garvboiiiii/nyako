import { useCallback, useRef, useState } from "react";

interface DropzoneProps {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label: string;
  hint: string;
}

export default function Dropzone({ accept, multiple, onFiles, label, hint }: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      onFiles(Array.from(fileList));
    },
    [onFiles]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`focus-ring cursor-pointer rounded-xl border-2 border-dashed p-6 sm:p-10 text-center transition touch-manipulation
        ${dragging ? "border-primary bg-primary/5" : "border-line bg-surface hover:border-ink/30"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        aria-label={label}
      />
      <p className="font-display text-sm uppercase tracking-wide text-ink">{label}</p>
      <p className="text-sm text-text-dim mt-2">{hint}</p>
      <p className="text-xs text-text-dim mt-4">
        Files are processed on your device. Nothing is uploaded to a server.
      </p>
    </div>
  );
}
