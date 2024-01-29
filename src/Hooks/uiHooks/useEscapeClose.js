import { useEffect } from "react";

export function useEscapeClose(handler) {
     useEffect(() => {
          function cModal(e) {
               if (e.code == "Escape") {
                    handler();
               }
          }

          document.addEventListener("keydown", cModal);
          return () => document.removeEventListener("keydown", cModal);
     }, [handler]);
}
