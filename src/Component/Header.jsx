function Header({ children }) {
   return (
      <h1 className={"text-xl font-bold text-zinc-100 text-clamp"}>
         {children}
      </h1>
   );
}

export default Header;
