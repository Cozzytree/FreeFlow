/* eslint-disable no-useless-catch */

export async function asyncHandler(link, method, credentials) {
   try {
      const response = await fetch(link, {
         method: method,
         credentials: credentials,
      });
      const data = await response.json();
      if (data?.success === false) {
         throw new Error(data?.message);
      }
      return data;
   } catch (error) {
      throw error;
   }
}
