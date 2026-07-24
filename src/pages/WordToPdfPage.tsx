import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/word-to-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";

export default function WordToPdfPage() {
  usePageTitle("Word to PDF");
  useMetaDescription("Convert a Word document to PDF for free, directly in your browser — no upload, no signup.");
  useTrackToolVisit("word-to-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    setResult(null);
    setError(null);
    setProgress(0);
    try {
      const output = await run(f, {}, setProgress);
      setResult(output);
    } catch {
      setError("Could not convert this file. Make sure it's a .docx file.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">Convert</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">Word to PDF</h1>
      <p className="text-sm text-text-dim mb-8">Turns a .docx into a PDF, ready to share.</p>

      {!file && (
        <Dropzone
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onFiles={handleFiles}
          label="Drop a .docx file or tap to browse"
          hint=""
        />
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Converting" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="word-to-pdf" blob={result} filename={`${file.name.replace(/\.docx$/i, "")}.pdf`} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="word-to-pdf" />

    </div>
  );
}
