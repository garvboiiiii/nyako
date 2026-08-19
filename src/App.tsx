import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OfflineBanner from "./components/OfflineBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy-loaded: each tool's engine (pdf-lib, pdf.js, browser-image-compression, ...)
// only ships to the browser when that specific tool page is visited.
// The homepage stays tiny.
const CompressImagePage = lazy(() => import("./pages/CompressImagePage"));
const TransparentImagePage = lazy(() => import("./pages/TransparentImagePage"));
const ResizeImagePage = lazy(() => import("./pages/ResizeImagePage"));
const CropImagePage = lazy(() => import("./pages/CropImagePage"));
const PassportPhotoPage = lazy(() => import("./pages/PassportPhotoPage"));
const OcrImagePage = lazy(() => import("./pages/OcrImagePage"));
const ConvertImageFormatPage = lazy(() => import("./pages/ConvertImageFormatPage"));
const ImageToPdfPage = lazy(() => import("./pages/ImageToPdfPage"));
const MergePdfPage = lazy(() => import("./pages/MergePdfPage"));
const SplitPdfPage = lazy(() => import("./pages/SplitPdfPage"));
const CompressPdfPage = lazy(() => import("./pages/CompressPdfPage"));
const PdfToImagesPage = lazy(() => import("./pages/PdfToImagesPage"));
const RotatePdfPage = lazy(() => import("./pages/RotatePdfPage"));
const DeletePdfPagesPage = lazy(() => import("./pages/DeletePdfPagesPage"));
const ExtractPdfPagesPage = lazy(() => import("./pages/ExtractPdfPagesPage"));
const PdfToWordPage = lazy(() => import("./pages/PdfToWordPage"));
const WordToPdfPage = lazy(() => import("./pages/WordToPdfPage"));
const ExcelToPdfPage = lazy(() => import("./pages/ExcelToPdfPage"));
const PptToPdfPage = lazy(() => import("./pages/PptToPdfPage"));

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <OfflineBanner />
        <Header />
        
        <main className="flex-1">
          <Suspense 
            fallback={
              <div data-nopagead="1" className="max-w-2xl mx-auto px-4 py-12 text-sm text-text-dim">
                Loading tool…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* Tool Routes */}
              <Route path="/tools/compress-image" element={<CompressImagePage />} />
              <Route path="/tools/transparent-image" element={<TransparentImagePage />} />
              <Route path="/tools/resize-image" element={<ResizeImagePage />} />
              <Route path="/tools/crop-image" element={<CropImagePage />} />
              <Route path="/tools/passport-photo" element={<PassportPhotoPage />} />
              <Route path="/tools/ocr-image" element={<OcrImagePage />} />
              <Route path="/tools/convert-image-format" element={<ConvertImageFormatPage />} />
              <Route path="/tools/image-to-pdf" element={<ImageToPdfPage />} />
              <Route path="/tools/merge-pdf" element={<MergePdfPage />} />
              <Route path="/tools/split-pdf" element={<SplitPdfPage />} />
              <Route path="/tools/compress-pdf" element={<CompressPdfPage />} />
              <Route path="/tools/pdf-to-images" element={<PdfToImagesPage />} />
              <Route path="/tools/rotate-pdf" element={<RotatePdfPage />} />
              <Route path="/tools/delete-pdf-pages" element={<DeletePdfPagesPage />} />
              <Route path="/tools/extract-pdf-pages" element={<ExtractPdfPagesPage />} />
              <Route path="/tools/pdf-to-word" element={<PdfToWordPage />} />
              <Route path="/tools/word-to-pdf" element={<WordToPdfPage />} />
              <Route path="/tools/excel-to-pdf" element={<ExcelToPdfPage />} />
              <Route path="/tools/ppt-to-pdf" element={<PptToPdfPage />} />
              
              {/* Static Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
