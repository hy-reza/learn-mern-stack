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
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
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
  const post = req.body;
  const _id = req.params.id;
  try {
    if (mongoose.isValidObjectId(_id)) {
      const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        { new: true }
      );

      res.status(200).json({
        message: `Post with id ${_id} is successfully updated !`,
        updatedPost,
      });
    } else {
      res.status(404).json({ message: `${_id} is not a valid ID ` });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    if (mongoose.isValidObjectId(id)) {
      const deletedPost = await PostMessage.findByIdAndDelete(id, {
        new: true,
      });
      res.status(200).json({
        message: `Post with id : ${id} is successfully deleted`,
        deletedPost,
      });
    } else {
      res.status(409).json({ message: `${id} is not a valid ID ` });
    }
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    if (!mongoose.isValidObjectId(id)) {
      res.status(409).json({ message: `${id} is not a valid ID` });
    }

    const post = await PostMessage.findOne({ id });
    
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index == -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({ message: "You like this post !", updatedPost });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
