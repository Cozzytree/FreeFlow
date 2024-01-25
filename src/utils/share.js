export function share(data) {
     if (navigator.share) {
          navigator
               .share(data)
               .then(() => console.log("Shared successfully"))
               .catch((error) => console.error("Error sharing:", error));
     } else {
          console.log("Web Share API not supported");
     }
}
