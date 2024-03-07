function Button({
   children,
   type,
   onClick,
   extrastyles,
   disabled = false,
   ariaLabel,
}) {
   let styles;
   if (type === "danger") {
      styles =
         "text-zinc-100 flex items-center gap-1 font-semibold rounded-sm w-fit text-center bg-red-700 p-1";
   }

   if (type === "primary") {
      styles =
         "w-fit p-2 bg-sky-900 text-zinc-100 hover:bg-sky-500 hover:text-zinc-800 transition-all duration-200 h-[100%] flex justify-center items-center";
   }

   if (type === "like") {
      styles =
         "w-[20px] h-[20px] flex justify-center items-center relative bg-sky-700/10 px-1 py-2 rounded-md border-[1px] border-sky-400/50";
   }

   return (
      <button
         aria-label={ariaLabel}
         onClick={onClick}
         disabled={disabled}
         className={`${styles} ${extrastyles} font-bold`}
      >
         {children}
      </button>
   );
}

export default Button;
