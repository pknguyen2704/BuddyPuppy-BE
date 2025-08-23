import { ttsService } from "../services/ttsServiceOpenAI.js";
import { ttsServiceGTTS } from "../services/ttsServicegtts.js"

export const ttsController = async (req, res) => {
  try {
    const { text, gender } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Thiếu text để đọc" });
    }

    const buffer = await ttsServiceGTTS(text, gender);

    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
