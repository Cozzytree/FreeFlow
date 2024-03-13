import { useEffect } from "react";

export function useClickOutside(ref, handler, clickOutside = true) {
   useEffect(() => {
      function handleOutsideClick(e) {
         const className = e.target?.classList[0];
         const parentClass = e.target.parentElement?.classList[0];

         const isSVG =
            e.target instanceof SVGElement ||
            e.target.tagName.toLowerCase() === "svg";
         if (
            ref.current &&
            !ref.current.contains(e.target) &&
            !isSVG &&
            className !== "modal" &&
            parentClass !== "modal"
         ) {
            if (clickOutside) {
               handler();
            }
         }
      }

      document.addEventListener("click", handleOutsideClick, true);

      return () => {
         document.removeEventListener("click", handleOutsideClick, true);
      };
   }, [handler, ref, clickOutside]);
}
