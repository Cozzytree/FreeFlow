/* eslint-disable no-useless-catch */
class Video {
     async getUserVideo() {
          try {
               const response = await fetch(
                    "http://localhost:8000/api/v1/videos/user_v",
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
                    `http://localhost:8000/api/v1/videos/${videoId}`
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
