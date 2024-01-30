export function time(t) {
   const locale = navigator.language;
   const hours = new Date().getHours(t);
   const day = new Date().getDay(t);

   if (day < 1 && hours < 24) {
      return `${hours} hours ago`;
   } else if (day > 7) {
      return new Intl.DateTimeFormat(locale, {
         dateStyle: "short",
         timeStyle: "short",
      }).format(new Date(t));
   } else {
      return `${day} days ago`;
   }
}
