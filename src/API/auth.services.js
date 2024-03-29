/* eslint-disable no-useless-catch */
import axios from "axios";

class Auth {
   async login(data) {
      return await axios
         .post(
            `${import.meta.env.VITE_API_URL}/users/login`,
            { email: data?.email, password: data?.password },
            {
               headers: { "Content-Type": "application/json" },
               withCredentials: true,
               timeout: 1000 * 10,
            }
         )
         .then((user) => {
            return user?.data;
         })
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
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
      return await axios
         .post(`${import.meta.env.VITE_API_URL}/users/register`, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
         .then((data) => data?.data)
         .catch((err) => {
            if (err) {
               throw new Error(err?.response?.data?.message);
            }
         });
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

   async loginWithOtp(email) {
      return await axios
         .post(
            `${import.meta.env.VITE_API_URL}/users/login/send-otp`,
            {
               email,
            },
            {
               headers: { "Content-Type": "application/json" },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async sendOtp(email, otp) {
      return await axios
         .post(
            `${import.meta.env.VITE_API_URL}/users/login/verifyOtp`,
            { email, otp },
            {
               headers: { "Content-Type": "application/json" },
            }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async clearWatchHistory() {
      return await axios
         .patch(
            `${import.meta.env.VITE_API_URL}/users/clearWatchHistory`,
            {},
            { withCredentials: true }
         )
         .then((data) => data?.data)
         .catch((err) => {
            throw new Error(err?.response?.data?.message);
         });
   }

   async settings() {
      return await axios
         .get(`${import.meta.env.VITE_API_URL}/users/ud/user_details`, {
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => {
            if (err) throw new Error(err?.response?.data?.data);
         });
   }

   async addLinkToBio(link) {
      return await axios
         .post(`${import.meta.env.VITE_API_URL}/users/addLinkToBio`, link, {
            withCredentials: true,
            headers: {
               "Content-Type": "application/json",
            },
         })
         .then((data) => data?.data)
         .catch((err) => {
            if (err) {
               throw new Error(err?.response?.data?.message);
            }
         });
   }

   async deleteLinkFromBio(linkId) {
      return await axios
         .delete(
            `${import.meta.env.VITE_API_URL}/users/deleteLinkfromBio/${linkId}`,
            {
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

   async UpdateBioText(text) {
      return await axios
         .post(`${import.meta.env.VITE_API_URL}/users/updateBioText`, text, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
         })
         .then((data) => data?.data)
         .catch((err) => {
            if (err) {
               throw new Error(err?.response?.data?.message);
            }
         });
   }
}

const authservices = new Auth();
export default authservices;
