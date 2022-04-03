import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "constants/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const createPost = (postBaru) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postBaru);
    dispatch({ type: CREATE, payload: data.newPost });
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data.updatedPost });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);
    dispatch({ type: DELETE, payload: data.deletedPost });
  } catch (error) {
    console.error(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data.updatedPost });
  } catch (error) {
    console.error(error);
  }
};
