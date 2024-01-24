/* eslint-disable no-useless-catch */
class Tweet {
     async getAllTweets() {
          try {
               const response = await fetch(
                    "http://localhost:8000/api/v1/tweet/at"
               );
               const data = await response.json();
               return data;
          } catch (error) {
               throw error;
          }
     }

     async deleteTweet(tweetId) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/vi/dt/${tweetId}`,
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

     async editTweet(tweetId) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/vi/et/${tweetId}`,
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

     async addTweet(data) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/v1/tweet/addTweet`,
                    {
                         method: "POST",
                         credentials: "include",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(data),
                    }
               );
               const dataArrive = await response.json();
               if (dataArrive?.success === false) {
                    throw new Error(dataArrive?.message);
               }
               return dataArrive;
          } catch (error) {
               throw error;
          }
     }
}

const tweetServices = new Tweet();
export default tweetServices;
