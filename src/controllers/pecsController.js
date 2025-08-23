import { getAllAnimalsService, getAnimalByIdService, createAnimalService } from "../services/pecsService";
import { StatusCodes } from "http-status-codes";

export const getAllAnimals = async (req, res, next) => {
    try {
        const animals = await getAllAnimalsService();
        res.status(StatusCodes.OK).json({ animals });
    } catch (error) {
        next(error);
    }
}
export const getAnimalById = async (req, res, next) => {
    try {
        const id = req.query.id;
        const animal = await getAnimalByIdService(id);
        if (!animal) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Animal not found" });
        }
        res.status(StatusCodes.OK).json({ animal });
    } catch (error) {
        next(error);
    }
}

export const createAnimal = async (req, res, next) => {
    try {
        const animalData = req.body;
        const newAnimal = await createAnimalService(animalData);
        res.status(StatusCodes.CREATED).json({ message: "Animal created successfully", animal: newAnimal });
    } catch (error) {
        if (error.message === "Animal name already exists") {
            return res.status(StatusCodes.CONFLICT).json({ message: error.message });
        }
        next(error);
    }
}