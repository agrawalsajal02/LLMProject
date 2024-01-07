
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET, // Make sure to use environment variables or another secure method!
});


export async function createNotionPage() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`;

    try {
        const response = await notion.pages.create({
          parent: { 
            database_id: process.env.NOTION_DATABASE_ID }, 
          properties: {
            title: {
              title: [
                {
                  text: {
                    content: `${formattedDate}`,
                  },
                },
              ],
            },
            // Add other properties here if needed
          },
        });
        
       return response;
      } catch (error) {
        console.error('Error creating Notion page:', error);
        return "";
      }
}

