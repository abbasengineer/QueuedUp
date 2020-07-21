import axios from "axios";

const setAuthorizationHeader = (token) => {
  const firebaseIDToken = `Bearer ${token}`;

  localStorage.setItem("firebaseIDToken", firebaseIDToken);
  axios.defaults.headers.common["Authorization"] = firebaseIDToken;
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });

  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: "SET_USER",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });

  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });

  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);

      dispatch(getUserData());
      dispatch({ type: "CLEAR_ERRORS" });

      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("firebaseIDToken");
  delete axios.defaults.headers.common["Authorization"];

  dispatch({ type: "SET_UNAUTHENTICATED" });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
