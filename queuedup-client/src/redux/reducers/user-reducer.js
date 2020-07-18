const initialState = {
  isAuth: false,
  credentials: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuth: true,
      };
    case "SET_UNAUTHENTICATED":
      return initialState;
    case "SET_USER":
      return {
        ...state,
        isAuth: true,
        loading: false,
        ...action.payload,
      };
    case "LOADING_USER":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
