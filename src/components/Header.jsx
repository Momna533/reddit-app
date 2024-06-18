import { FaReddit, FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import {
  FILTER_POSTS,
  SET_SEARCH,
  SET_POSTS,
  ERROR_TRUE,
  LOADING_FALSE,
} from "../redux/ReduxActions";
import { useEffect } from "react";
import axios from "axios";

const Header = ({ search, dispatch }) => {
  const handleSearch = (e) => {
    dispatch({ type: SET_SEARCH, payload: e.target.value });
  };
  const filterPosts = (e) => {
    e.preventDefault();
    dispatch({ type: FILTER_POSTS, payload: search });
  };

  const fetchPosts = async (subreddit) => {
    try {
      const url =
        subreddit === "all"
          ? `https://www.reddit.com/r/all.json`
          : `https://www.reddit.com/r/${subreddit}.json`;
      const res = await axios.get(url);
      const reddits = res.data.data.children;

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
    if (search === "") {
      fetchPosts("all");
    }
  }, [search]);
  return (
    <header>
      <div className="logo">
        <FaReddit className="logo__icon" />
        <p>
          Reddit<span>Minimal</span>
        </p>
      </div>
      <form className="search" onSubmit={filterPosts}>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Search"
          aria-label="search posts"
          value={search}
          onChange={handleSearch}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

const mapStateToProps = (state) => {
  const { search, posts } = state;
  return { search, posts };
};

export default connect(mapStateToProps)(Header);
