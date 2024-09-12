import Groq from 'groq-sdk';
import { GROQ_API_KEY } from './constants';

// baseURL: 'https://api.groq.com/openai/v1',

const client = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default client;
