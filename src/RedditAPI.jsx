import axios from "axios";

const redditAPI = axios.create({
  baseURL: "https://www.reddit.com",
});
export const fetchPosts = async (subreddit) => {
  try {
    const response = await redditAPI.get(
      "https://www.reddit.com/r/${subreddit}.json"
    );
    return response;
    // console.log(response.data.data.children[0].data.subreddit);
  } catch (error) {
    handleAPIError(error);
    throw error; // Rethrow the error to handle it in the component
  }
};
const handleAPIError = (error) => {
  console.error("Reddit API Error:", error);
  // Implement your error handling logic here, such as showing a user-friendly error message
};
