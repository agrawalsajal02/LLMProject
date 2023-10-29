import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

import OpenAI from "openai";

const openai2 = new OpenAI({
    organization: process.env.ORG_ID,
    apiKey: process.env.API_KEY,
});

const GMAIL_USERNAME = process.env.GMAIL_USERNAME;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;


const openaiQuery = async (userPrompt) => {
    return new Promise((resolve, reject) => {
      openai2
        .chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userPrompt }],
        })
        .then((openaiRes) => {
          resolve(openaiRes.choices[0].message.content);
        })
        .catch((e) => {
         console.log(e);
          reject(e);
        });
    });
  };

  const TENOR_API_ENDPOINT = "https://tenor.googleapis.com/v2/search";
  const TENOR_API_KEY = process.env.TENOR_API_KEY;

  const fetchGifFromTenor= async (query) =>{
    return new Promise((resolve, reject) => {
        axios.get(TENOR_API_ENDPOINT, {
            params: {
                q: query,
                key: TENOR_API_KEY,
                limit: 1
            }
        })
        .then(response => {
            if (!response.data.results || response.data.results.length === 0) {
                // console.log(response.data.media_formats);
                reject(new Error('No GIF found'));
            } else {
                console.dir(response.data.results[0].media_formats.tinygif.url)
                resolve(response.data.results[0].media_formats.tinygif.url);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

const randomQueries = [
    'laughing baby',
    'excited squirrel',
    'dancing grandma',
    'funny fail',
    'cute hedgehog',
    'sleepy koala',
    'clumsy penguin',
    'surprised llama',
    'playful dolphin',
    'chasing tail',
    'silly face',
    'jump scare',
    'prank reaction',
    'giggling parrot',
    'hovering owl',
    'slippery floor',
    'startled cat',
    'breakdancing dog',
    'turtle speed race',
    'awkward handshake',
    'funny cat' // Included your initial query as well
];

const getRandomQuery = (queries) => {
    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
};



app.get('/send-email', async (req, res) => {
   let emailHtml = '<html><body>';

    try {
    
        const joke = await fetchJokesFromOpenAi();
        emailHtml += `<h2>Joke of the day:</h2> <p>${joke}</p>`;

        console.log("Fetching Tenor API");
        const gifUrl = await fetchGifFromTenor(getRandomQuery(randomQueries));
        console.log(gifUrl)
        emailHtml += `<p><img src="${gifUrl}"  alt="Random Funny GIF" /></p>`;


        const motivation = await fetchMotivationFromOpenAI();
        emailHtml += `<h2>Motivation of the day:</h2> <p>${motivation}</p>`;

        // Complete the HTML
        emailHtml += '</body></html>';

        console.log("Sending Email");
        await sendEmail('sajal.agarwal705@gmail.com', 'Daily Summary', emailHtml);

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
    // Implement OpenAI API logic here.
    // Return motivation text.
    console.log("Fetching quote from bhagwat geeta")
    return await openaiQuery("Give a quote from bhagwat geeta")
}

async function fetchTasksFromNotion() {
    // Implement Notion API logic here.
    // Return an array of tasks.
}

async function fetchJokesFromOpenAi() {
    // Implement Notion API logic here.
    // Return an array of tasks.
    console.log("fetching jokes from openAI")
    return await openaiQuery("Tell me a joke that a indian can relate")
}

async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_USERNAME,
            pass: GMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: GMAIL_USERNAME,
        to: to,
        subject: subject,
        // text: text
        html: text
    };

    await transporter.sendMail(mailOptions);
}
