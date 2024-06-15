import {
  SET_POSTS,
  SET_SELECTED_SUBREDDIT,
  SET_SUBREDDITS,
  LOADING_TRUE,
  LOADING_FALSE,
  ERROR_TRUE,
  ERROR_FALSE,
  FILTER_POSTS,
  SET_SEARCH,
} from "./ReduxActions";

const initialState = {
  posts: [],
  subreddits: [],
  selectedSubreddit: "all",
  search: "",
  loading: true,
  error: false,
};

const Reducer = (state = initialState, action) => {
  if (action.type === LOADING_TRUE) {
    return { ...state, loading: true };
  } else if (action.type === LOADING_FALSE) {
    return { ...state, loading: false };
  } else if (action.type === ERROR_TRUE) {
    return { ...state, error: true };
  } else if (action.type === ERROR_FALSE) {
    return { ...state, error: false };
  } else if (action.type === SET_POSTS) {
    return {
      ...state,
      posts: action.payload,
    };
  } else if (action.type === SET_SUBREDDITS) {
    return {
      ...state,
      subreddits: action.payload,
    };
  } else if (action.type === SET_SEARCH) {
    return {
      ...state,
      search: action.payload,
    };
  } else if (action.type === SET_SELECTED_SUBREDDIT) {
    return { ...state, selectedSubreddit: action.payload };
  } else if (action.type === FILTER_POSTS) {
    const filteredPosts = state.posts.filter((post) =>
      post.data.subreddit.includes(state.search)
    );

    return {
      ...state,
      posts: filteredPosts,
    };
  }

  return state;
};

export default Reducer;
