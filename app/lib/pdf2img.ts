export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url"; // Vite resolves it as URL

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}


export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  try {
    console.log("📥 Starting PDF conversion for", file.name);

    const lib = await loadPdfJs();
    console.log("✅ Loaded PDF.js lib");

    const arrayBuffer = await file.arrayBuffer();
    console.log("✅ Got arrayBuffer");

    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log("✅ Loaded PDF doc");

    const page = await pdf.getPage(1);
    console.log("✅ Got page 1");

    const viewport = page.getViewport({ scale: 4 });
    console.log("✅ Got viewport", viewport);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    console.log("✅ Created canvas");

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    } else {
      console.warn("⚠️ Canvas context is null");
    }

    await page.render({ canvasContext: context!, viewport }).promise;
    console.log("✅ Rendered PDF to canvas");

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          console.log("✅ Converted canvas to blob");

          const originalName = file.name.replace(/\.pdf$/i, "");
          const imageFile = new File([blob], `${originalName}.png`, {
            type: "image/png",
          });

          resolve({
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
          });
        } else {
          console.error("❌ canvas.toBlob returned null");
          resolve({
            imageUrl: "",
            file: null,
            error: "Failed to create image blob",
          });
        }
      }, "image/png", 1.0);
    });

  } catch (err) {
    console.error("❌ Exception in convertPdfToImage", err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err}`,
    };
  }
}
