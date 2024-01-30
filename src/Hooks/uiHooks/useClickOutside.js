import { useEffect } from "react";

export function useClickOutside(ref, handler, clickOutside = true) {
   useEffect(() => {
      function handleOutsideClick(e) {
         const isSVG =
            e.target instanceof SVGElement ||
            e.target.tagName.toLowerCase() === "svg";
         if (ref.current && !ref.current.contains(e.target) && !isSVG) {
            if (clickOutside) {
               handler();
            }
         }
      }

      document.addEventListener("click", handleOutsideClick, false);

      return () => {
         document.removeEventListener("click", handleOutsideClick, false);
      };
   }, [handler, ref, clickOutside]);
}
