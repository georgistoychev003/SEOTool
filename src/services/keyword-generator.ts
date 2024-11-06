import OpenAI from 'openai';
import type { KeywordData } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateKeywords(content: string): Promise<KeywordData[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are an SEO expert. Analyze the content and generate relevant keywords with their metrics. Return only JSON array."
      }, {
        role: "user",
        content: `Generate SEO keywords from this content: ${content}. 
        Return a JSON array of objects with properties: 
        keyword (string), 
        searchVolume (number 100-100000), 
        difficulty (number 1-100), 
        competition (number 0-1), 
        priorityScore (calculated based on volume and difficulty, 1-100).
        Include only 10 most relevant keywords.`
      }],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.keywords || [];
  } catch (error) {
    throw new Error('Failed to generate keywords');
  }
}