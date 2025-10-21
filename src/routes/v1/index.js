import express from "express";
import { StatusCodes } from "http-status-codes";
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import pecsRoutes from './pecsRoutes.js'
import ttsRoutes from './ttsRoutes'
import SocialStoryRoutes from './SocialStoryRoutes.js'

const Router = express.Router();

// Test route
Router.get("/status", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "APIs V1 are ready to use" });
});

// Mount các route con
Router.use("/auth", authRoutes);
Router.use("/users", userRoutes);
Router.use("/pecs", pecsRoutes);
Router.use("/textToSpeech", ttsRoutes);
Router.use("/social-story", SocialStoryRoutes)
export const APIs_V1 = Router;
