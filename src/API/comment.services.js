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

   async updateVideoComment(commentId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/comments/uc/${commentId}`,
            {
               method: "PATCH",
               credentials: "include",
            }
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
      // try {
      //    const response = await fetch(
      //       `${import.meta.env.VITE_API_URL}/comments/atc/${tweetId}`,
      //       {
      //          method: "POST",
      //          credentials: "include",
      //          headers: {
      //             "Content-Type": "application/json",
      //          },
      //          body: JSON.stringify(content),
      //       }
      //    );
      //    const data = await response.json();
      //    if (data?.success === false) {
      //       throw new Error(data?.message);
      //    }
      //    return data;
      // } catch (error) {
      //    throw error;
      // }
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

   async updateTweetComment(commentId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/comments/utc/${commentId}`,
            {
               method: "PATCH",
               credentials: "include",
            }
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
}

const commentsServices = new Comment();
export default commentsServices;
