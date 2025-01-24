import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function listFilesRecursively(dir) {
  const files = await fs.readdir(dir);
  const allFiles = [];

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      const subFiles = await listFilesRecursively(fullPath);
      allFiles.push(...subFiles.map(f => join(file, f)));
    } else {
      allFiles.push(file);
    }
  }

  return allFiles;
}

async function setup() {
  try {
    // Create public directory if it doesn't exist
    try {
      await fs.access('public');
    } catch {
      await fs.mkdir('public');
    }

    // List contents of pdfjs-dist directory
    const pdfjsPath = join('node_modules', 'pdfjs-dist');
    const files = await listFilesRecursively(pdfjsPath);
    console.log('Available files in pdfjs-dist:', files);

    // Try to find the worker file
    const workerFile = files.find(file => 
      (file.includes('pdf.worker') && file.endsWith('.js')) ||
      (file.includes('pdf.worker') && file.endsWith('.mjs'))
    );
    
    if (!workerFile) {
      throw new Error('Could not find pdf.worker file');
    }

    // Copy the worker file
    await fs.copyFile(
      join(pdfjsPath, workerFile),
      join('public', 'pdf.worker.min.js')
    );

    console.log('PDF worker file copied successfully');
  } catch (error) {
    console.error('Error setting up PDF worker:', error);
    process.exit(1);
  }
}

setup();

