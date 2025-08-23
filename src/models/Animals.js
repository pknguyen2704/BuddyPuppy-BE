import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    sound: { type: String, required: true },
}, { timestamps: true });

const Animal = mongoose.model("Animal", animalSchema);
export default Animal;
