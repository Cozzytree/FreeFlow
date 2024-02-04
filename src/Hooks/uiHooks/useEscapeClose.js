import { useEffect } from "react";

export function useEscapeClose(handler, escape) {
   useEffect(() => {
      function cModal(e) {
         if (e.code == "Escape") {
            if (escape === true) {
               handler();
            }
         }
      }

      document.addEventListener("keydown", cModal);
      return () => document.removeEventListener("keydown", cModal);
   }, [handler, escape]);
}
