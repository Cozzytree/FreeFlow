/* eslint-disable no-useless-catch */
class Video {
   async getUserVideo(userId) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos/user_v/${userId}`,
            {
               method: "GET",
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

   async getAvideo(videoId) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos/${videoId}`,
            {
               method: "GET",
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

   async getAllVideos({ pageparam = 1 }) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos?page=${pageparam}&limit=10`,
            { method: "GET" }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error(data?.message);
         }
         return { data, pageparam };
      } catch (error) {
         throw error;
      }
   }

   async uploadVideo(formData) {
      try {
         const response = await fetch(
            "http://localhost:8000/api/v1/videos/upload",
            {
               method: "POST",
               credentials: "include",
               body: formData,
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

   async deleteVideo(videoId) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos/d/${videoId}`,
            {
               method: "DELETE",
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

   async addView(videoId) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos/addView/${videoId}`,
            {
               method: "PATCH",
               credentials: "include",
            }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error(data?.message);
         }
      } catch (error) {
         throw error;
      }
   }

   async updateVideo(videoId, info) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos/e_title/${videoId}`,
            {
               method: "PATCH",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(info),
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

   async updateThumbnail(videoId, formData) {
      console.log(videoId, formData);
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/videos/e_thumbnail/${videoId}`,
            {
               method: "PATCH",
               credentials: "include",
               body: formData,
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

   async recommends(videoId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/videos/recommends/${videoId}`
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
const videoservices = new Video();
export default videoservices;
