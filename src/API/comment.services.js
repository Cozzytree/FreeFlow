/* eslint-disable no-useless-catch */

class Comment {
   async getVideoComments({ videoId, pageParam = 1 }) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/comments/v/${videoId}?page=${pageParam}&limit=10`,
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
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/comments/ac/${videoId}`,
            {
               method: "POST",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(content),
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

   async deleteVideoComment(commentId) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/comments/dc/${commentId}`,
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
            `http://localhost:8000/api/v1/comments/uc/${commentId}`,
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
            `http://localhost:8000/api/v1/comments/tc/${tweetId}?page=${pageParam}&limit=10`,
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
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/comments/atc/${tweetId}`,
            {
               method: "POST",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(content),
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

   async deleteTweetComment(commentId) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/comments/dtc/${commentId}`,
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
            `http://localhost:8000/api/v1/comments/utc/${commentId}`,
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
