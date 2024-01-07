import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const TENOR_API_ENDPOINT = "https://tenor.googleapis.com/v2/search";
const TENOR_API_KEY = process.env.TENOR_API_KEY;

const fetchGifFromTenor = async (query) => {
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
                reject(new Error('No GIF found'));
            } else {
                resolve(response.data.results[0].media_formats.tinygif.url);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

export default fetchGifFromTenor;
