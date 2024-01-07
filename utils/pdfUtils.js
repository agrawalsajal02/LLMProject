import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generatePdfPageUrl(req, fileName) {
    const domain = `${req.protocol}://${req.get('host')}`;
    const pdfPageUrl = `${domain}/pdf/pdf-read/${fileName}`;
    
    return pdfPageUrl;
}

export async function suggestRandomPage(req, fileName) {
    const pdfPath = path.join(__dirname,'..', 'pdf', fileName+'.pdf');
    
    // Use promise-based read
    const pdfBytes = await fsPromises.readFile(pdfPath);
    
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();
    const suggestedPage = Math.floor(Math.random() * totalPages) + 1;
   return suggestedPage;
}

