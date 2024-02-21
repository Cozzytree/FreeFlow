import { useEffect } from "react";

export function useLazyImage(element, dataset, dependency, attribute) {
   useEffect(() => {
      const tweets = document.querySelectorAll(element);
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               const image = entry.target;
               const src = image.getAttribute(dataset);
               if (src && entry.isIntersecting) {
                  image.setAttribute(attribute, src);
                  image.removeAttribute(dataset);
                  observer.unobserve(image);
               } else if (entry.isIntersecting) {
                  entry.target.classList.add("opacity-100");
               } else if (!entry.isIntersecting) {
                  entry.target.classList.remove("opacity-100");
                  entry.target.classList.add("opacity-0");
               }
            });
         },
         {
            root: null,
            threshold: 0.5,
         }
      );
      tweets.forEach((tweet) => observer.observe(tweet));

      return () => observer.disconnect();
   }, [dependency]);
}
