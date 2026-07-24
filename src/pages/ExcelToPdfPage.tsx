import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/excel-to-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";

export default function ExcelToPdfPage() {
  usePageTitle("Excel to PDF");
  useMetaDescription("Convert an Excel spreadsheet to PDF for free, right in your browser.");
  useTrackToolVisit("excel-to-pdf");
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
      setError("Could not convert this file. Make sure it's a .xlsx file.");
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
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">Excel to PDF</h1>
      <p className="text-sm text-text-dim mb-8">Every sheet becomes a printable page of its table.</p>

      {!file && (
        <Dropzone
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onFiles={handleFiles}
          label="Drop a .xlsx file or tap to browse"
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
          <DownloadCard toolId="excel-to-pdf" blob={result} filename={`${file.name.replace(/\.xlsx$/i, "")}.pdf`} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="excel-to-pdf" />

    </div>
  );
}
