import { NavLink } from "react-router-dom";

function Link({ children, to, active = false }) {
   return (
      <NavLink
         to={to}
         className={`grid grid-cols-[auto_auto] items-end transition-all duration-300 hover:text-zinc-800 hover:bg-zinc-400 p-3 gap-1 ${
            active === true ? "border-b-[1px] border-b-zinc-400" : ""
         }`}
      >
         {children}
      </NavLink>
   );
}

export default Link;
