import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import Preloader from "./LoadingSkeleton";
// import LoadingSkeleton from "react-loading-skeleton";

const PostItem = ({ author, created_utc, ups, title, num_comments, url }) => {
  const calculateElapsedTime = (createdUtc) => {
    const now = new Date();
    const postTime = new Date(createdUtc * 1000);
    const elapsed = now - postTime;
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s ago`;
  };

  const elapsedTime = calculateElapsedTime(created_utc);
  return (
    <div className="card">
      <div className="post__wrapper">
        <div className="post__votes__container">
          <button
            type="button"
            className="icon__action__button up__vote"
            aria-label="Up Vote"
          >
            <FaArrowUp className="arrow__icon" />
          </button>
          <p className="post__votes__value">{ups}</p>
          <button
            type="button"
            className="icon__action__button down__vote"
            aria-label="Down Vote"
          >
            <FaArrowDown className="arrow__icon" />
          </button>
        </div>
        <div className="post__container">
          <h3 className="post__title">{title}</h3>
          <div className="post__image__container">
            <img className="post__image" src={url} alt={title} />
          </div>
          <div className="post__details">
            <span className="author__details">
              <img
                src={url}
                alt={`${author} profile`}
                className="avatar__profile__image"
              />
              <span className="author__username">{author}</span>
            </span>
            <span>{elapsedTime}</span>
            <div className="post__comments__container">
              <button
                type="button"
                className="icon__action__button"
                aria-label="Show comments"
              >
                <FaComment className="comment__icon icon__action" />
                {num_comments}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostsList = ({ posts, loading }) => {
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className="posts__list">
      {posts.map((post) => {
        const data = post.data;
        return <PostItem {...data} key={data.id} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { posts, loading } = state;
  return {
    posts,
    loading,
  };
};
export default connect(mapStateToProps)(PostsList);
