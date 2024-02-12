/* eslint-disable no-useless-catch */
class Auth {
   async login(data) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/login`,
            {
               method: "POST",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
            }
         );
         const userdata = await response.json();
         if (userdata?.success === false) {
            throw new Error(userdata?.message);
         }
         return userdata;
      } catch (err) {
         console.log(err);
         throw err;
      }
   }

   async logout() {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/logout`,
            {
               method: "POST",
               credentials: "include",
            }
         );
         const data = await response.json();
         console.log(data);
         if (data?.success === false) {
            throw new Error(data?.message);
         }
         return data;
      } catch (error) {
         throw error;
      }
   }

   async getUserProfile(userId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${userId}`,
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

   async getCurrentUser() {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/getcurrentUser`,
            {
               credentials: "include",
            }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error("none");
         }
         return data;
      } catch (error) {
         throw error;
      }
   }

   async signUp(formData) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/v1/users/register`,
            {
               method: "POST",
               credentials: "include",
               body: formData,
            }
         );

         const Userdata = await response.json();
         console.log(Userdata);
         return Userdata;
      } catch (error) {
         console.log(error);
         throw error;
      }
   }

   async updateWatchHistory(videoId) {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/wh/${videoId}`,
            {
               method: "PATCH",
               credentials: "include",
            }
         );
         const data = await response.json();
         return data;
      } catch (error) {
         throw error;
      }
   }

   async getUserWatchHistory() {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/wh/watch_history`,
            {
               credentials: "include",
            }
         );
         const data = await response.json();
         if (data?.success === false) {
            throw new Error("none");
         }
         return data;
      } catch (error) {
         throw error;
      }
   }
}
const authservices = new Auth();
export default authservices;
