import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

// const BASE_URL = "";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// TODO: client 에서 불러서..
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration);

export const fetchGptAnswer = async (place) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content:
            "You are an assistant knowing everything about Korea's Kangwondo's tour places. Answer as concisely as possible.",
        },
        {
          role: "user",
          content: `I'm going to ${place} at Kangwondo, Korea. Give me a breif explanation or a review of this place. Then, add comments about this place just like you are a professional traveler.Answer in Korean and skip the unnecessary part, only main part about reviewing.`,
        },
      ],
    })
    .then((res) => {
      console.log("res", res);
      const data = res.data;
      console.log("answer-> ", data.choices[0].message);
      return data.choices[0].message;
    })
    .catch((err) => {
      console.log("eror occured: ", err);
      return err;
    });
};
