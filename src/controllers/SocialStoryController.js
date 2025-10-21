
import { StatusCodes } from "http-status-codes";
import { getAllStoriesService } from "../services/SocialStoryService";
export const getAllStories = async (req, res, next) => {
    try {
        const stories = await getAllStoriesService();
        res.status(StatusCodes.OK).json({ stories });
    } catch (error) {
        next(error);
    }
}
export const getStoryById = async (req, res, next) => {
    try {
        const id = req.query.id;
        const story = await getStoryByIdService(id);
        if (!story) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Story not found" });
        }
        res.status(StatusCodes.OK).json({ story });
    } catch (error) {
        next(error);
    }
}