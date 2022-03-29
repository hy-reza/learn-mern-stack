import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message, data: [] });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post is created successfully !", newPost });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, message, creator, tags } = req.body;
  const _id = req.params.id;
  try {
    if (mongoose.isValidObjectId(_id)) {
      const updatedPost = await PostMessage.findOneAndUpdate(
        { _id },
        { title, message, creator, tags },
        { new: true }
      );

      res.status(200).json({
        message: `Post with id ${_id} is successfully updated !`,
        updatedPost,
      });
    }
    res.status(404).json({ message: `${_id} is not a valid ID ` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
