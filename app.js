import express from 'express';
import dotenv from 'dotenv';
import pdfRoutes from './routes/pdfRoute.js';
import { generatePdfPageUrl } from './utils/pdfUtils.js';
import { getRandomQuery } from './data/tenorSuggestions.js';
import fetchGifFromTenor from './services/tenor.js';
import { openaiQuery ,fetchJokesFromOpenAi} from './services/openai.js';
import { sendEmail } from './services/gmail.js'; // New Import

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use('/pdf', pdfRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

app.get('/send-email', async (req, res) => {
   let emailHtml = '<html><body>';

    try {
   
        const joke = await fetchJokesFromOpenAi();
        emailHtml += `<h2>Joke of the day:</h2> <p>${joke}</p>`;

        console.log("Fetching Tenor API");
        const gifUrl = await fetchGifFromTenor(getRandomQuery());
        console.log(gifUrl)
        emailHtml += `<p><img src="${gifUrl}"  alt="Random Funny GIF" /></p>`;


        // const motivation = await fetchMotivationFromOpenAI();
        // emailHtml += `<h2>Motivation of the day:</h2> <p>${motivation}</p>`;
 
        // Suggest a random page from the SystemDesign.pdf
        const systemDesignPdfUrl =  await generatePdfPageUrl(req,"SystemDesign");
        emailHtml += `
        <h2 style="font-family: Arial, sans-serif; color: #333;">Topic for Today to Read:  
            <a href="${systemDesignPdfUrl}" style="color: #007BFF; text-decoration: none; font-weight: bold;">System Design</a>
        </h2>`;
        
          // Suggest a random page from the NavalRaikant.pdf
          const navalRaikantPdfUrl =  await generatePdfPageUrl(req,"NavalRaikant");
          emailHtml += `
          <h2 style="font-family: Arial, sans-serif; color: #333;">Topic for Today to Read:  
              <a href="${navalRaikantPdfUrl}" style="color: #007BFF; text-decoration: none; font-weight: bold;">Naval Raikant</a>
          </h2>`;

        // Complete the HTML
        emailHtml += '</body></html>';

        console.log("Sending Email");
        await sendEmail('sajal.agarwal705@gmail.com', 'DayStarterDigest', emailHtml);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).send('Error sending email');
    }
});

async function fetchBirthdaysFromGoogleCalendar() {
    // Implement Google Calendar API logic here.
    // Return an array of birthday events.
    return ['Alice', 'Bob'];
}

async function fetchMotivationFromOpenAI() {
    console.log("Fetching quote from bhagwat geeta")
    return openaiQuery("Give a quote from bhagwat geeta")
}

async function fetchTasksFromNotion() {
    // Implement Notion API logic here.
    // Return an array of tasks.
}

async function fetchJokesFromOpenAi() {
    // Implement Notion API logic here.
    // Return an array of tasks.
    console.log("fetching jokes from openAI")
    return openaiQuery("Tell me a joke that a indian can relate")
}
