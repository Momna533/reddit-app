import Header from "./components/Header";
import PostsList from "./components/PostsList";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  ERROR_FALSE,
  ERROR_TRUE,
  LOADING_FALSE,
  LOADING_TRUE,
  SET_SUBREDDITS,
} from "./redux/ReduxActions";

const App = ({ dispatch, selectedSubreddit, search }) => {
  const fetchPosts = async (subreddit) => {
    dispatch({ type: LOADING_TRUE });
    dispatch({ type: ERROR_FALSE });
    try {
      const allReddits = await axios.get(`https://www.reddit.com/r/all.json`);
      const url =
        subreddit === "all"
          ? `https://www.reddit.com/r/all.json`
          : `https://www.reddit.com/r/${subreddit}.json`;
      const res = await axios.get(url);
      const reddits = res.data.data.children;
      const subredditsNames = [
        ...new Set(
          allReddits.data.data.children.map((reddit) => reddit.data.subreddit)
        ),
      ];
      dispatch({
        type: SET_SUBREDDITS,
        payload: ["all", ...subredditsNames],
      });
      dispatch({
        type: "SET_POSTS",
        payload: reddits,
      });
    } catch (error) {
      dispatch({ type: ERROR_TRUE });
      console.log(error);
      throw error;
    } finally {
      dispatch({ type: LOADING_FALSE });
    }
  };
  useEffect(() => {
    fetchPosts(selectedSubreddit);
  }, [selectedSubreddit]);
  return (
    <div className="App">
      <Header />
      <div className="row">
        <main>
          <PostsList />
        </main>
        <Sidebar />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { loading, error, selectedSubreddit, search } = state;
  return { loading, error, selectedSubreddit, search };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
