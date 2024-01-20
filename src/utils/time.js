export function formatTime(date) {
  return Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}
