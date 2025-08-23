import express from "express";
import { StatusCodes } from "http-status-codes";
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import pecsRoutes from './pecsRoutes.js'

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

export const APIs_V1 = Router;
