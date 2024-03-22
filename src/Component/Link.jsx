import { NavLink } from "react-router-dom";

function Link({ children, to, active = false, onClick }) {
   return (
      <NavLink
         onClick={onClick}
         to={to}
         className={`grid grid-cols-[1fr_1fr] border-b-[1px] justify-items-center border-transparent transition-all duration-300 hover:text-zinc-800 hover:bg-zinc-400 p-3 gap-1 rounded-md text-xs ${
            active === true ? "bg-zinc-400 text-zinc-900" : ""
         }`}
      >
         {children}
      </NavLink>
   );
}

export default Link;
