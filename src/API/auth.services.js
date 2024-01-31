/* eslint-disable no-useless-catch */
class Auth {
   async login(data) {
      try {
         const response = await fetch(
            `http://localhost:8000/api/v1/users/login`,
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
            `http://localhost:8000/api/v1/users/logout`,
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
            `http://localhost:8000/api/v1/users/${userId}`,
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
            "http://localhost:8000/api/v1/users/getcurrentUser",
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
            "http://localhost:8000/api/v1/users/register",
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
}
const authservices = new Auth();
export default authservices;
