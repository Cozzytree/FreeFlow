import axios from "axios";

/* eslint-disable no-useless-catch */
class Playlist {
   async getUserPlaylist(videoId) {
      return await axios
         .get(
            `${import.meta.env.VITE_API_URL}/playlist/getPlaylists/${videoId}`,
            {
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async createPlaylist({ name }) {
      return await axios
         .put(
            `${import.meta.env.VITE_API_URL}/playlist/createPlaylist`,
            {
               name,
            },
            {
               withCredentials: true,
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async deleteAplaylist(playlistId) {
      return await axios
         .delete(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/deletePlaylist/${playlistId}`,
            {
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async addVideoToP(playlistId, videoId) {
      return await axios
         .patch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/addVideo/${playlistId}/${videoId}`,
            {},
            {
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async removevideoFromPl(playlistId, videoId) {
      return await axios
         .patch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/removeVideo/${playlistId}/${videoId}`,
            {},
            {
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async getAplaylist(playlistId) {
      return await axios
         .get(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/getAplaylist/${playlistId}`,
            {
               withCredentials: true,
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async editPlayName(playlistId, name) {
      return await axios
         .patch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/editPlaylistName/${playlistId}`,
            name,
            {
               withCredentials: true,
               headers: { "Content-Type": "application/json" },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            if (err) throw new Error(err?.response?.data?.message);
         });
   }

   async editPlayDescription(playlistId, description) {
      return await axios
         .patch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/editDescription/${playlistId}`,
            description,
            {
               withCredentials: true,
               headers: { "Content-Type": "application/json" },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            if (err) throw new Error(err?.response?.data?.message);
         });
   }
}

const playlistservices = new Playlist();
export default playlistservices;
