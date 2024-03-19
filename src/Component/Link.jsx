import { NavLink } from "react-router-dom";

function Link({ children, to, active = false, onClick }) {
   return (
      <NavLink
         onClick={onClick}
         to={to}
         className={`grid grid-cols-[1fr_1fr] border-b-[1px] border-transparent items-end transition-all duration-300 hover:text-zinc-800 hover:bg-zinc-400 p-3 gap-1 rounded-md text-xs ${
            active === true ? "border-b-zinc-400" : ""
         }`}
      >
         {children}
      </NavLink>
   );
}

export default Link;
