/* eslint-disable no-useless-catch */

import axios from "axios";

class Comment {
   async getVideoComments({ videoId, pageParam = 1 }) {
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/comments/v/${videoId}?page=${pageParam}&limit=10`,
            { method: "GET" }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error(data?.message);
         }
         return { data, pageParam };
      } catch (error) {
         throw error;
      }
   }

   async addVideoComment(videoId, content) {
      return await axios
         .post(
            `${import.meta.env.VITE_API_URL}/comments/ac/${videoId}`,
            content,
            {
               headers: { "Content-Type": "application/json" },
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            if (err) {
               throw new Error(err?.response?.data?.message);
            }
         });
   }

   async deleteVideoComment(commentId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/comments/dc/${commentId}`,
            { method: "DELETE", credentials: "include" }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error(data?.message);
         }
         return data;
      } catch (error) {
         throw error;
      }
   }

   async updateVideoComment(commentId, content) {
      return await axios
         .patch(
            `${import.meta.env.VITE_API_URL}/comments/uc/${commentId}`,
            content,
            {
               withCredentials: true,
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            if (err) {
               throw new Error(err?.response?.data?.message);
            }
         });
   }

   async getTweetComments({ tweetId, pageParam = 1 }) {
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/comments/tc/${tweetId}?page=${pageParam}&limit=10`,
            { method: "GET" }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error(data?.message);
         }
         return { data, pageParam };
      } catch (error) {
         throw error;
      }
   }

   async addTweetComment(tweetId, content) {
      return await axios
         .post(
            `${import.meta.env.VITE_API_URL}/comments/atc/${tweetId}`,
            content,
            {
               headers: { "Content-Type": "application/json" },
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((error) => {
            if (error) {
               throw new Error(error?.response?.data?.message);
            }
         });
   }

   async deleteTweetComment(commentId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/comments/dtc/${commentId}`,
            { method: "DELETE", credentials: "include" }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error(data?.message);
         }
         return data;
      } catch (error) {
         throw error;
      }
   }

   async updateTweetComment({ commentId, content }) {
      if (!commentId && !content) return;
      return await axios
         .patch(
            `${import.meta.env.VITE_API_URL}/comments/utc/${commentId}`,
            content,
            {
               withCredentials: true,
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            if (err) {
               throw new Error(err?.response?.data?.message);
            }
         });
   }
}

const commentsServices = new Comment();
export default commentsServices;
