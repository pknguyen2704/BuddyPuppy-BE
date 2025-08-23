import express from "express";
import { authMiddleware } from "../../middlewares/authMiddlewares.js";
import { getAllAnimals, getAnimalById, createAnimal } from "../../controllers/pecsController";

const router = express.Router();

router.get("/all-animals", authMiddleware, getAllAnimals);
router.get("/one-animal", authMiddleware, getAnimalById);
router.post("/create-animal", authMiddleware, createAnimal);

export default router;