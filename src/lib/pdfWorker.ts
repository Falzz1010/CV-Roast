import { GlobalWorkerOptions } from 'pdfjs-dist';

// Set worker directly from node_modules path
export function setupPdfWorker() {
  GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}
