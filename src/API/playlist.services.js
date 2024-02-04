/* eslint-disable no-useless-catch */
class Playlist {
   async getUserPlaylist() {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/playlist/getPlaylists`,
            { method: "GET", credentials: "include" }
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

   async createPlaylist(name) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/playlist/createPlaylist`,
            {
               method: "PUT",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(name),
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

   async deleteAplaylist(playlistId) {
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/deletePlaylist/${playlistId}`,
            {
               method: "DELETE",
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

   async addVideoToP(playlistId, videoId) {
      console.log(playlistId, videoId);
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/addVideo/${playlistId}/${videoId}`,
            {
               method: "PUT",
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

   async removevideoFromPl(playlistId, videoId) {
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/removeVideo/${playlistId}/${videoId}`,
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

   async getAplaylist(playlistId) {
      try {
         const response = await fetch(
            `${
               import.meta.env.VITE_API_URL
            }/playlist/getAplaylist/${playlistId}`,
            {
               method: "GET",
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
}

const playlistservices = new Playlist();
export default playlistservices;
