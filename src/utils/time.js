export function time(t) {
   const locale = navigator.language;
   const currentTime = new Date();
   const targetTime = new Date(t);

   const timeDifference = currentTime - targetTime;
   const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
   const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

   if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
   } else if (dayDifference < 1) {
      return "today";
   } else if (dayDifference === 1) {
      return "yesterday";
   } else if (dayDifference <= 7) {
      return `${dayDifference} days ago`;
   } else {
      return new Intl.DateTimeFormat(locale, {
         dateStyle: "short",
         timeStyle: "short",
      }).format(targetTime);
   }
}
