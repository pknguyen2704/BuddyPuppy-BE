import mongoose from "mongoose";

const socialStorySchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: { type: String, required: true },
    description: {type: String, required: true},
    image: {type: String, required: true},
    slug: {type: String, required: true},
}, { timestamps: true });

const SocialStory = mongoose.model("SocialStory", socialStorySchema);
export default SocialStory;
