/* eslint-disable no-useless-catch */
class Like {
     async toggleLikeTweet(tweetId) {
          try {
               const response = await fetch(
                    `http://localhost:8000/api/v1/like/tl/${tweetId}`,
                    {
                         method: "POST",
                         credentials: "include",
                    }
               );
               const data = await response.json();
               if (data?.success == false) {
                    throw new Error(data?.message);
               }
               return data;
          } catch (error) {
               throw error;
          }
     }
}

const likeservices = new Like();
export default likeservices;
