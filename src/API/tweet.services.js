import axios from "axios";

/* eslint-disable no-useless-catch */
class Tweet {
   async getAllTweets() {
      return axios
         .get(`${import.meta.env.VITE_API_URL}/tweet/at`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async deleteTweet(tweetId) {
      return axios
         .delete(`${import.meta.env.VITE_API_URL}/tweet/d/${tweetId}`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async editTweet(tweetId, { content }) {
      return axios
         .patch(
            `${import.meta.env.VITE_API_URL}/tweet/editTweet/${tweetId}`,
            {
               content,
            },
            {
               headers: { "Content-Type": "application/json" },
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async addTweet({ content }) {
      return axios
         .post(
            `${import.meta.env.VITE_API_URL}/tweet/addTweet`,
            {
               content,
            },
            {
               headers: { "Content-Type": "application/json" },
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async getUserTweets(userId) {
      return await axios
         .get(`${import.meta.env.VITE_API_URL}/tweet/user_t/${userId}`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async getATweet(tweetId) {
      return await axios
         .get(`${import.meta.env.VITE_API_URL}/tweet/info/${tweetId}`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }
}

const tweetServices = new Tweet();
export default tweetServices;
