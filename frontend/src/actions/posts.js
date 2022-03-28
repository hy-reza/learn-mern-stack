import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const createPost = (postBaru) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postBaru);
    dispatch({ type: "CREATE", payload: data.newPost });
  } catch (error) {
    console.error(error);
  }
};
