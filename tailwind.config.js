/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         boxShadow: {
            "shadow-xl":
               "0 10px 30px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
         },
         fontFamily: {
            MPLUS: "M PLUS Code Latin, monospace",
         },
         animation: {
            slow: "1s ease linear",
         },
         keyframes: {
            slow: {
               from: {
                  opacity: 0,
               },
               to: {
                  opacity: 1,
               },
            },
         },
         fontSize: {
            clamp: ["clamp(0.8rem, 1.2rem, 1.5rem)"],
         },
      },
   },
   plugins: [],
};
