function Header({ children }) {
   return (
      <h1
         className={
            "text-xl font-bold text-zinc-100 text-clamp py-2 px-2 underline"
         }
      >
         {children}
      </h1>
   );
}

export default Header;
