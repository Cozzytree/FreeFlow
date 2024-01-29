/* eslint-disable no-useless-catch */
export async function subscribe(channelId) {
   try {
      const response = await fetch(
         `http://localhost:8000/api/v1/subscribe/${channelId}`,
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
