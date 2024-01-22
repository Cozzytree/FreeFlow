function Button({ children, type, onClick }) {
     let styles;
     if (type === "danger") {
          styles = "text-zinc-100 w-[100%]  text-center bg-red-700 p-2";
     }
     if (type === "primary") {
          styles =
               "bg-sky-600 text-zinc-900 h-[20px] text-sm md:text-md flex items-center md:h-[30px] rounded-md p-2 hover:bg-sky-500 hover:text-zinc-800 transition-all duration-200 outline-none";
     }
     if (type === "like") {
          styles =
               "bg-sky-700/10 px-2 md:px-4 py-2 rounded-md border-[1px] border-sky-400/50";
     }
     return (
          <button onClick={onClick} className={styles}>
               {children}
          </button>
     );
}

export default Button;
