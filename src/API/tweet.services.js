import axios from "axios";
import { PER_PAGE } from "../utils/consts.js";

/* eslint-disable no-useless-catch */
class Tweet {
   async getAllTweets(pageparam = 1) {
      return axios
         .get(
            `${
               import.meta.env.VITE_API_URL
            }/tweet/at?page=${pageparam}&limit=${PER_PAGE}`,
            {
               withCredentials: true,
            }
         )
         .then((data) => {
            return { data: data?.data, pageparam };
         })
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
      return await axios
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
         .catch((err) => {
            if (err) {
               err?.response?.data?.message;
            }
         });
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
