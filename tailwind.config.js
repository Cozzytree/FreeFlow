/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
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
      },
   },
   plugins: [],
};
