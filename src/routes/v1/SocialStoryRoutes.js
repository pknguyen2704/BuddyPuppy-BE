import express from "express";
import { authMiddleware } from "../../middlewares/authMiddlewares";
import { getAllStories, getStoryById } from "../../controllers/SocialStoryController";

const router = express.Router()

router.get("/", authMiddleware, getAllStories)
router.get("/story", authMiddleware, getStoryById)

export default router