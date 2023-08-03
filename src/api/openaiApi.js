import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

// const BASE_URL = "";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const fetchGptAnswer = (propmt) => {

}