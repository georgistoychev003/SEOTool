import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract relevant content
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const h1Tags = $('h1').map((_, el) => $(el).text()).get();
    const h2Tags = $('h2').map((_, el) => $(el).text()).get();
    const paragraphs = $('p').map((_, el) => $(el).text()).get();
    
    // Combine all content
    return [
      title,
      metaDescription,
      ...h1Tags,
      ...h2Tags,
      ...paragraphs
    ].join(' ');
  } catch (error) {
    throw new Error('Failed to scrape website content');
  }
}