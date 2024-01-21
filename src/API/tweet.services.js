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
                    `http://localhost:8000/api/vi/dt/${tweetId}`
               );
          } catch (error) {
               throw error;
          }
     }

     async editTweet(tweetId) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/vi/et/${tweetId}`
               );
          } catch (error) {
               throw error;
          }
     }

     async addTweet(tweetId, data) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/vi/at/${tweetId}`,
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(data),
                    }
               );
               const dataArrive = await response.json();
               return dataArrive;
          } catch (error) {
               throw error;
          }
     }
}

const tweetServices = new Tweet();
export default tweetServices;
