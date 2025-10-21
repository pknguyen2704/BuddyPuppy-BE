import SocialStory from "../models/SocialStory";

export const getAllStoriesService = async () => {
  const stories = await SocialStory.find()
  return stories
}

export const getStoryByIdService = async (id) => {
  const story = await SocialStory.findOne({id: Number(id)})
  return story
}

