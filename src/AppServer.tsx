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

// Same pages as App.tsx, but imported eagerly (no React.lazy) since this
// tree is only ever used for build-time prerendering in Node — never
// shipped to the browser. Plain synchronous imports mean renderToString
// can render the real page content in one pass, with no Suspense/lazy
// resolution timing to worry about.
import CompressImagePage from "./pages/CompressImagePage";
import TransparentImagePage from "./pages/TransparentImagePage";
import ResizeImagePage from "./pages/ResizeImagePage";
import CropImagePage from "./pages/CropImagePage";
import PassportPhotoPage from "./pages/PassportPhotoPage";
import OcrImagePage from "./pages/OcrImagePage";
import ConvertImageFormatPage from "./pages/ConvertImageFormatPage";
import ImageToPdfPage from "./pages/ImageToPdfPage";
import MergePdfPage from "./pages/MergePdfPage";
import SplitPdfPage from "./pages/SplitPdfPage";
import CompressPdfPage from "./pages/CompressPdfPage";
import PdfToImagesPage from "./pages/PdfToImagesPage";
import RotatePdfPage from "./pages/RotatePdfPage";
import DeletePdfPagesPage from "./pages/DeletePdfPagesPage";
import ExtractPdfPagesPage from "./pages/ExtractPdfPagesPage";
import PdfToWordPage from "./pages/PdfToWordPage";
import WordToPdfPage from "./pages/WordToPdfPage";
import ExcelToPdfPage from "./pages/ExcelToPdfPage";
import PptToPdfPage from "./pages/PptToPdfPage";

export default function AppServer() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <OfflineBanner />
        <Header />

        <main className="flex-1">
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
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
