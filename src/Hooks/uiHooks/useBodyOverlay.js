import { useEffect } from "react";

export const useBodyOverlay = (dependent) => {
   useEffect(() => {
      if (dependent) {
         document.body.classList.add("overflow-hidden");
      } else {
         document.body.classList.remove("overflow-hidden");
      }
   }, [dependent]);
};
