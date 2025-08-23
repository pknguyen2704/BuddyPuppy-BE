import Animal from "../models/Animals";

export const getAllAnimalsService = async () => {
    const animals = await Animal.find();
    return animals;
}

export const getAnimalByIdService = async (id) => {
    const animal = await Animal.findOne({ id: Number(id) });
    return animal;
}

export const createAnimalService = async (animalData) => {
    const existingAnimal = await Animal.findOne({ name: animalData.name });
    if (existingAnimal) {
        throw new Error("Animal name already exists");
    }

    const newAnimal = new Animal(animalData);
    const savedAnimal = await newAnimal.save();
    return savedAnimal;
}

export const updateAnimalService = async (id, animalData) => {
    const updatedAnimal = await Animal.findOneAndUpdate({ id: id }, animalData, { new: true });
    return updatedAnimal;
}