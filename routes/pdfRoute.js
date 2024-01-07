import express from 'express';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {suggestRandomPage} from '../utils/pdfUtils.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.use(fileUpload());

router.get('/pdf-read/:fileName/:page', async (req, res) => {
    try {
        const pageNumber = parseInt(req.params.page, 10);
        const fileName = req.params.fileName;
        const pdfPath = path.join(__dirname, '..', 'pdf', `${fileName}.pdf`);
        console.log(pdfPath)
        if (!fs.existsSync(pdfPath)) {
            return res.status(404).send('PDF file not found');
        }

        const pdfBytes = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        if (pageNumber < 1 || pageNumber > totalPages) {
            return res.status(400).send('Invalid page number');
        }

        // Create a new PDF with just the desired page
        const newPdfDoc = await PDFDocument.create();
        const noOfPages=4;
        const pagesToCopy = Array.from({ length: noOfPages }, (_, index) => pageNumber - 1 + index);
        const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToCopy);
        
        for (const page of copiedPages) {
            newPdfDoc.addPage(page);
        }
        const pageBytes = await newPdfDoc.save();

        // Save to a temporary file
        const uniqueFileName = `${uuidv4()}.pdf`;
        const tempFilePath = path.join('/tmp', uniqueFileName);
        // const tempFilePath = path.join(__dirname, '..','pdf', 'output', uniqueFileName);

        fs.writeFileSync(tempFilePath, pageBytes);

        // Send the temporary file
        res.sendFile(tempFilePath, (err) => {
            // Delete the temp file after sending to prevent accumulating files on disk
            fs.unlinkSync(tempFilePath);
        });

    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/pdf-read/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const pageNo= await suggestRandomPage(req,fileName);
        const pageNumber = parseInt(pageNo);
        res.redirect(`/pdf/pdf-read/${fileName}/${pageNumber}`);
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send('Internal server error');
    }
});


router.get('/upload-form', (req, res) => {
    const formHtml = `
        <html>
            <head>
                <title>Upload PDF</title>
            </head>
            <body>
                <form ref='uploadForm' 
                      action='/pdf/upload-pdf' 
                      method='post' 
                      encType="multipart/form-data">
                    <input type="file" name="pdfFile" />
                    <input type='submit' value='Upload!' />
                </form>
            </body>
        </html>
    `;

    res.send(formHtml);
});

router.post('/upload-pdf', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Get the uploaded file
    let uploadedFile = req.files.pdfFile;  // "pdfFile" is the name attribute in your form's input

    // Set the file path
    const filePath = path.join(__dirname,'..', 'pdf', uploadedFile.name);

    // Use the mv() method to move the file to the desired location
    uploadedFile.mv(filePath, (err) => {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded and saved!');
    });
});


export default router;