/* eslint-disable no-useless-catch */
export async function subscribe(channelId) {
   try {
      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/subscribe/${channelId}`,
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

export async function subscription() {
   try {
      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/subscribe/subbedTo`,
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
