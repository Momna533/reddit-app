import { Suspense } from "react";
import { connect } from "react-redux";
import Preloader from "./LoadingSkeleton";

const SubredditsList = ({
  loading,
  subreddits,
  selectedSubreddit,
  handleRedditsFilter,
}) => {
  return (
    <ul className="subreddits__list">
      {subreddits.length < 1 ? (
        <Preloader />
      ) : (
        subreddits.map((subreddit) => {
          const borderColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;
          const isActive = subreddit === selectedSubreddit;
          const className = isActive ? "active" : "";

          return (
            <li key={subreddit}>
              <button
                type="button"
                onClick={() => handleRedditsFilter(subreddit)}
                className={className}
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt={subreddit}
                  className="subreddit__icon"
                  style={{ border: `3px solid ${borderColor}` }}
                />
                {subreddit}
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
};
const Sidebar = ({
  loading,
  subreddits,
  selectedSubreddit,
  handleRedditsFilter,
}) => {
  return (
    <aside className="subreddits">
      <div className="card subreddit__card">
        <h2>Subreddits</h2>
        <Suspense fallback={<h1>loading...</h1>}>
          <SubredditsList
            loading={loading}
            subreddits={subreddits}
            selectedSubreddit={selectedSubreddit}
            handleRedditsFilter={handleRedditsFilter}
          />
        </Suspense>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => {
  const { subreddits, selectedSubreddit, loading } = state;
  return { subreddits, selectedSubreddit, loading };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleRedditsFilter: (subreddit) => {
      dispatch({ type: "SET_SELECTED_SUBREDDIT", payload: subreddit });
    },
  };
};
// const mapDispatchToProps = (dispatch, ownProps) => {
//   const { id, amount } = ownProps;

//   return {
//     remove: () => dispatch(removeItem(id)),
//     increase: () => dispatch({ type: INCREASE, payload: { id } }),
//     decrease: () => dispatch({ type: DECREASE, payload: { id, amount } }),
//     toggle: toggle => dispatch({ type: TOGGLE_AMOUNT, payload: { id, toggle } })
//   };
// };
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
