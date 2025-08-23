import gTTS from "gtts";
import fs from "fs";
import { exec } from "child_process";

export const ttsServiceGTTS = async (text, gender) => {
  return new Promise((resolve, reject) => {
    const tts = new gTTS(text, "en");
    const filePath = "./output.mp3";
    const finalPath = "./output_final.mp3";

    tts.save(filePath, (err) => {
      if (err) return reject(err);

      const pitch = gender === "male" ? "0.607" : "0.7"; 
      const speed = 0.65;
      exec(
        `ffmpeg -y -i ${filePath} -filter:a "asetrate=44100*${pitch},atempo=${speed/pitch}" ${finalPath}`,
        (err) => {
          if (err) return reject(err);
          const buffer = fs.readFileSync(finalPath);
          resolve(buffer);
        }
      );
    });
  });
};
