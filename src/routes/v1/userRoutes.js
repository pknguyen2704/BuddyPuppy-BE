import express from "express";
import { authMiddleware, isAdmin } from "../../middlewares/authMiddlewares.js";
import { getProfile, getAllUsers, promoteUser } from "../../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);

router.get("/", authMiddleware, isAdmin, getAllUsers);

router.put("/promote", authMiddleware, isAdmin, promoteUser);


export default router;
