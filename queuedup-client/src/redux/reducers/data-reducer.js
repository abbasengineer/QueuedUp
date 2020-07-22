const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  let index;

  switch (action.type) {
    case "LOADING_DATA":
      return {
        ...state,
        loading: true,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "EDIT_POST":
      index = state.posts.findIndex(
        (post) => post.postID === action.payload[0]
      );

      state.posts[index].content = action.payload[1].content;

      state.posts[index] = {
        ...state.posts[index],
      };

      return {
        ...state,
        loading: false,
      };
    case "DELETE_POST":
      index = state.posts.findIndex((post) => post.postID === action.payload);

      state.posts.splice(index, 1);

      return {
        ...state,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "ADD_COMMENT":
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
}
