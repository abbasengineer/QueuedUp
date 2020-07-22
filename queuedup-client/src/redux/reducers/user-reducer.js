const initialState = {
  isAuth: false,
  credentials: {},
  loading: false,
  increments: [],
  decrements: [],
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
        isAuth: true,
        loading: false,
        ...action.payload,
      };
    case "LOADING_USER":
      return {
        ...state,
        loading: true,
      };
    case "INCREMENT_POST":
      return {
        ...state,
        increments: [
          ...state.increments,
          {
            username: state.credentials.username,
            postID: action.payload.postID,
          },
        ],
      };
    case "UNINCREMENT_POST":
      return {
        ...state,
        increments: state.increments.filter(
          (increment) => increment.postID !== action.payload.postID
        ),
      };
    case "DECREMENT_POST":
      return {
        ...state,
        decrements: [
          ...state.decrements,
          {
            username: state.credentials.username,
            postID: action.payload.postID,
          },
        ],
      };
    case "UNDECREMENT_POST":
      return {
        ...state,
        decrements: state.decrements.filter(
          (decrement) => decrement.postID !== action.payload.postID
        ),
      };
    default:
      return state;
  }
}
