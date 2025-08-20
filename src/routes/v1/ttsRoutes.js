import express from "express";
import { ttsController } from "../../controllers/ttsController";

const router = express.Router();

router.post("/speak", ttsController);

export default router;
