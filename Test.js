import axios from 'axios';
import cheerio from 'cheerio';


// Example function to scrape a hypothetical webpage for job information.
async function scrapeJobInfo(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });

    console.log("data");
    console.log(data);

    const $ = cheerio.load(data);

    // These selectors are hypothetical and would need to be adjusted for the specific structure of the webpage
    const jobTitle = $('.job-title').text().trim();
    const company = $('.company').text().trim();

    return {
      jobTitle,
      company
    };

  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}

// Hypothetical example URL
const url = 'https://www.linkedin.com/in/sajalagrawal14';

console.log("hi");
scrapeJobInfo(url).then(info => {
  if (info) {
    console.log(`Current Position: ${info.jobTitle}`);
    console.log(`Current Company: ${info.company}`);
  } else {
    console.log('Job information could not be found.');
  }
});
