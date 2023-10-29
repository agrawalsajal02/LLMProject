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

app.get('/send-email', async (req, res) => {
    let emailContent = '';

    try {
        // // 1. Fetch birthdays from Google Calendar API.
        // const birthdays = await fetchBirthdaysFromGoogleCalendar();
        // emailContent += `Birthdays coming up: `;

        // 2. Fetch joke of the day.
        // const joke = "Your joke source..."+; // Modify as per your source

        const joke = await fetchJokesFromOpenAi();
        emailContent += `Joke of the day: ${joke}\n\n`;

        // 3. Fetch motivation of the day from ChatGPT OpenAI API.
        const motivation = await fetchMotivationFromOpenAI();
        emailContent += `Motivation of the day: ${motivation}\n\n`;

        // // // 4. Fetch tasks from Notion.
        // // const tasks = await fetchTasksFromNotion();
        // // emailContent += `Tasks completed yesterday:`;

        // // 5. Send the email.
        console.log("sending Email")
        await sendEmail('sajal.agarwal705@gmail.com', 'Daily Summary', emailContent);

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
        text: text
    };

    await transporter.sendMail(mailOptions);
}
