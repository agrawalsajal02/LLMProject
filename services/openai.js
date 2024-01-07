import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
const openai2 = new OpenAI({
    organization: process.env.ORG_ID,
    apiKey: process.env.API_KEY,
});

export const openaiQuery = async (userPrompt) => {
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


export const fetchJokesFromOpenAi = async () => {
    console.log("fetching jokes from openAI");
    const topics = [
      "Technology", "Food", "Weather", "School",
      "Travel", "Animals", "Fitness", "Music", 
      "Family", "Office"
  ];
  
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const query = `Tell me a joke related to ${randomTopic}`;

  return openaiQuery(query);
}
