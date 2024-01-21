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
               const response = await fetch(`${import.meta.env.API_URL}`);
               const data = await response.json();
               return data;
          } catch (error) {
               throw error;
          }
     }

     async getUser(username) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/v1/users/${username}`,
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
}
const authservices = new Auth();
export default authservices;
