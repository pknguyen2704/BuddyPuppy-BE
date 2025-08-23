import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { env } from "../config/environment";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

export const ttsService = async (text, gender) => {
  try {
    const voice = gender === "male" ? "alloy" : "verse";

    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
      format: "mp3",
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    return buffer;
  } catch (error) {
    throw new Error(error.message);
  }
};
