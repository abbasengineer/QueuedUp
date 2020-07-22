import axios from "axios";

export const clearErrors = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

export const getPosts = () => (dispatch) => {
  dispatch({ type: "LOADING_DATA" });

  axios
    .get("/getposts")
    .then((response) => {
      dispatch({
        type: "SET_POSTS",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: "SET_POSTS",
        payload: [],
      });
    });
};

export const getPost = (postID) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });

  axios
    .get(`/getpost/${postID}`)
    .then((response) => {
      dispatch({
        type: "SET_POST",
        payload: response.data,
      });

      dispatch({ type: "STOP_LOADING_UI" });
    })
    .catch((error) => console.log(error));
};

export const addPost = (newPost) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });

  axios
    .post(`/addpost`, newPost)
    .then((response) => {
      dispatch({
        type: "ADD_POST",
        payload: response.data,
      });

      dispatch(clearErrors());
    })
    .catch((error) => console.log(error));
};

export const editPost = (postID, editedPost) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });

  axios
    .post(`/getpost/${postID}/edit`, editedPost)
    .then((response) => {
      dispatch({
        type: "EDIT_POST",
        payload: [postID, response.data],
      });

      dispatch(clearErrors());
    })
    .catch((error) => console.log(error));
};

export const deletePost = (postID) => (dispatch) => {
  axios
    .delete(`/getpost/${postID}`)
    .then(() => {
      dispatch({
        type: "DELETE_POST",
        payload: postID,
      });
    })
    .catch((error) => console.log(error));
};

export const addComment = (postID, commentData) => (dispatch) => {
  axios
    .post(`/getpost/${postID}/addcomment`, commentData)
    .then((res) => {
      dispatch({
        type: "ADD_COMMENT",
        payload: res.data,
      });

      dispatch(clearErrors());
    })
    .catch((error) => console.log(error));
};
