import { FaReddit } from "react-icons/fa";
import { connect } from "react-redux";
import {
  SET_SEARCH,
  LOADING_TRUE,
  ERROR_FALSE,
  LOADING_FALSE,
  ERROR_TRUE,
} from "../redux/ReduxActions";
import { useEffect, useRef } from "react";
import axios from "axios";

const Header = ({ search, dispatch }) => {
  const searchRef = useRef();

  const fetchPosts = async () => {
    dispatch({ type: LOADING_TRUE });
    dispatch({ type: ERROR_FALSE });
    try {
      const url = `https://www.reddit.com/r/${search}.json`;
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
    fetchPosts();
  }, [search]);

  const searchReddit = () => {
    dispatch({ type: SET_SEARCH, payload: searchRef.current.value });
  };
  return (
    <header>
      <div className="logo">
        <FaReddit className="logo__icon" />
        <p>
          Reddit<span>Minimal</span>
        </p>
      </div>
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Search"
          aria-label="search posts"
          ref={searchRef}
          onChange={searchReddit}
          autoComplete="off"
        />
      </form>
    </header>
  );
};

const mapStateToProps = (state) => {
  const { search, posts } = state;
  return { search, posts };
};

export default connect(mapStateToProps)(Header);
