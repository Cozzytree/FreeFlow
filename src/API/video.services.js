import axios from "axios";

/* eslint-disable no-useless-catch */
class Video {
   async getUserVideo(userId) {
      return await axios
         .get(`${import.meta.env.VITE_API_URL}/videos/user_v/${userId}`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async getAvideo(videoId) {
      return await axios
         .get(`${import.meta.env.VITE_API_URL}/videos/${videoId}`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async getAllVideos({ pageparam = 1 }) {
      return await axios
         .get(
            `${import.meta.env.VITE_API_URL}/videos?page=${pageparam}&limit=10`
         )
         .then((data) => {
            return { data: data?.data, pageparam };
         })
         .catch((err) => err?.response?.data?.message);
   }

   async uploadVideo(formData) {
      return axios
         .post(`${import.meta.env.VITE_API_URL}/videos/upload`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);

      // try {
      //    const response = await fetch(
      //       `${import.meta.env.VITE_API_URL}/videos/upload`,
      //       {
      //          method: "POST",
      //          credentials: "include",
      //          body: formData,
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

   async deleteVideo(videoId) {
      return await axios
         .delete(`${import.meta.env.VITE_API_URL}/videos/d/${videoId}`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async addView(videoId) {
      return await axios
         .patch(
            `${import.meta.env.VITE_API_URL}/videos/addView/${videoId}`,
            {},
            { withCredentials: true }
         )
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async updateVideo(videoId, info) {
      return await axios
         .patch(
            `${import.meta.env.VITE_API_URL}/videos/e_title/${videoId}`,
            info,
            {
               withCredentials: true,
               headers: { "Content-Type": "application/json" },
            }
         )
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }

   async updateThumbnail(videoId, formData) {
      return await axios
         .patch(
            `${import.meta.env.VITE_API_URL}/videos/e_thumbnail/${videoId}`,
            formData,
            {
               withCredentials: true,
               headers: { "Content-Type": "multipart/form-data" },
            }
         )
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
      // try {
      //    const response = await fetch(
      //       `${import.meta.env.VITE_API_URL}/videos/e_thumbnail/${videoId}`,
      //       {
      //          method: "PATCH",
      //          credentials: "include",
      //          body: formData,
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

   async searchVideo(q, filter = "videos", sort = "createdAt") {
      return await axios
         .get(
            `${
               import.meta.env.VITE_API_URL
            }/videos/s/query?q=${q}&filter=${filter}&sort=${sort}`
         )
         .then((data) => data?.data)
         .catch((err) => err?.response?.data?.message);
   }
}
const videoservices = new Video();
export default videoservices;
