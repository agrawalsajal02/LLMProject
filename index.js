import express from 'express';
import dotenv from 'dotenv';
import pdfRoutes from './routes/pdfRoute.js';
import { generatePdfPageUrl } from './utils/pdfUtils.js';
import { getRandomQuery } from './data/tenorSuggestions.js';
import fetchGifFromTenor from './services/tenor.js';
import { fetchJokesFromOpenAi } from './services/openai.js';
import { sendEmail } from './services/gmail.js';
import { getRandomDesignTopic } from './data/systemTopics.js';
import {getGeetaShlok} from "./services/bhagwatGeeta.js"
import { createNotionPage } from './services/notion.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {fetchTopicForJournal} from "./services/journal.js"
import {fetchTwoBhaktiVideo,fetchTwoMotivationalVideos,fetchTwoSongVideo} from "./services/youtubeVideo.js"
import { connectDB } from "./CONFIG/db.js";
import taskService from './routes/taskService.js';

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;
const date = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long' });
const EMAIL_SUBJECT = `DayStarterDigest - A letter to Yourself - ${date}`;

const app = express();

// Middleware for parsing application/json
app.use(express.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/pdf', pdfRoutes);
app.use('/goal', taskService);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/', (req, res) => res.send('Hey this is my API running 🥳'));
app.get('/send-email', generateAndSendEmail);


app.set('view engine', 'ejs');


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

async function generateAndSendEmail(req, res) {
    try {
        const emailContent = await generateEmailContent(req);
        await sendEmail(RECIPIENT_EMAIL, EMAIL_SUBJECT, emailContent);
        console.log("Email sent successfully!");
        res.send('Email sent successfully!');
    } catch (error) {
        console.error("Error in generateAndSendEmail: ", error);
        res.status(500).send('Error sending email');
    }
}

async function generateEmailContent(req) {
    const joke = await fetchJokesFromOpenAi();
    const gifUrl = await fetchGifFromTenor(getRandomQuery());
    const systemDesignPdfUrl = await generatePdfPageUrl(req, "SystemDesign");
    const navalRaikantPdfUrl = await generatePdfPageUrl(req, "NavalRaikant");
    const designTopic = getRandomDesignTopic();
    const journalIdea = fetchTopicForJournal();
    const geetaShlok = await getGeetaShlok(req);

    const motivationalVideo = fetchTwoMotivationalVideos();
    const bhaktiVideo = fetchTwoBhaktiVideo();
    const songVideo = fetchTwoSongVideo();
    const email =  `${req.protocol}://${req.get('host')}`+"/send-email";
    // we can also suggest number of topics we can task about and we can also store  these in the notion page itself
    const notionPage = await createNotionPage();

    // Read the HTML template
    const templatePath = path.join(__dirname, './templates/emailTemplate.html');
    let emailContent = fs.readFileSync(templatePath, 'utf-8');

    emailContent = emailContent.replace('{{joke}}', joke);
    emailContent = emailContent.replace('{{gifUrl}}', gifUrl);
    emailContent = emailContent.replace('{{systemDesignPdfUrl}}', systemDesignPdfUrl);
    emailContent = emailContent.replace('{{navalRaikantPdfUrl}}', navalRaikantPdfUrl);
    emailContent = emailContent.replace('{{getRandomDesignTopic}}', designTopic.url);
    emailContent = emailContent.replace('{{subTopicName}}', designTopic.subTopic);
    emailContent = emailContent.replace('{{geetaShlok}}', geetaShlok);
    emailContent = emailContent.replace('{{notionPage}}', notionPage.url);
    emailContent = emailContent.replace('{{journalIdea}}', journalIdea);

    emailContent = emailContent.replace(/{{motivationalVideo-1}}/g, motivationalVideo[0]);
    emailContent = emailContent.replace(/{{motivationalVideo-2}}/g, motivationalVideo[1]);
    emailContent = emailContent.replace(/{{bhaktiVideo-1}}/g, bhaktiVideo[0]);
    emailContent = emailContent.replace(/{{bhaktiVideo-2}}/g, bhaktiVideo[1]);
    emailContent = emailContent.replace(/{{songVideo-1}}/g, songVideo[0]);
    emailContent = emailContent.replace(/{{songVideo-2}}/g, songVideo[1]);
    emailContent = emailContent.replace(/{{songVideo-3}}/g, songVideo[2]);

    emailContent = emailContent.replace('{{email-trigger}}', email);

    // can have video of chanykaya niti as well
    return emailContent;
}
