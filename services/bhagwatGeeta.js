import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const GEETA_ENDPOINT = "https://bhagavadgitaapi.in/slok/18/30/gita.svg";

export const getGeetaShlok = async (req) => {

    try {
        const i = Math.floor(Math.random() * 18) + 1; // Randomly select chapter between 1 and 18
        const j = Math.floor(Math.random() * 30) + 1; // Randomly select shlok between 1 and 30

        // const GEETA_ENDPOINT = `https://bhagavadgitaapi.in/slok/${i}/${j}/gita.svg`;
        // const response = await fetch(GEETA_ENDPOINT);
        // const svgContent = await response.text();
        const domain = `${req.protocol}://${req.get('host')}`;
        const outputPath = path.join(__dirname, 'images', 'geeta', `${i}`, `${j}.jpg`);
        const outputUrl = `${domain}/images/geeta/${i}/${j}.jpg`;

        // // Ensure the directory exists, if not create it
        // if (!fs.existsSync(path.dirname(outputPath))) {
        //     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        // }

        // await convertSVGtoJPG(svgContent, outputPath);
        
        return outputUrl;

    } catch (error) {
        throw error;
    }
}



const GEETA_ENDPOINT_BASE = "https://bhagavadgitaapi.in/slok";


const downloadAndSaveImage = async (i, j) => {
    const GEETA_ENDPOINT = `${GEETA_ENDPOINT_BASE}/${i}/${j}/gita.svg`;
    try {
        const response = await axios.get(GEETA_ENDPOINT, {
            responseType: 'text' // Get the SVG as text
        });

        // Define the output path
        const outputPath = path.join(__dirname, '..', 'images', 'geeta', `${i}`, `${j}.svg`);
        const outputPath2 = path.join(__dirname, '..', 'images', 'geeta', `${i}`, `${j}.jpg`);




        // Ensure the directory exists, if not create it
        fs.mkdirSync(path.join(__dirname,'..', 'images', 'geeta', `${i}`), { recursive: true });

        // Write the SVG content to a file
        fs.writeFileSync(outputPath, response.data);

        convertSVGtoJPG(response.data, outputPath2);
        fs.unlinkSync(outputPath);
        console.log(`Saved SVG for chapter ${i}, slok ${j}`);
    } catch (error) {
        console.error(`Failed to fetch/save SVG for chapter ${i}, slok ${j}. Error:`, error);
    }
}


// Download and save all images
const downloadAllImages = async () => {
    for (let i = 1; i <= 18; i++) {
        for (let j = 1; j <= 30; j++) {
            await downloadAndSaveImage(i, j);
        }
    }
}

async function convertSVGtoJPG(svgContent, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.setContent(svgContent, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outputPath, type: 'jpeg' });
  
    await browser.close();
  }

// downloadAllImages();