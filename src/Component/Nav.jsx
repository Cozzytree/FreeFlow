import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import Button from "./Button";

function Nav() {
  const [isNav, setIsNav] = useState(true);
  return (
    <>
      <FaBars
        onClick={() => setIsNav((op) => !op)}
        className={`${
          isNav ? "rotate-90" : "rotate-0"
        } absolute left-2 top-1 z-[20] transition-all duration-200 size-6`}
        cursor="pointer"
      />
      <nav
        className={`absolute left-1 top-0 bg-zinc-700 z-10 flex flex-col items- justify-between px-5 py-8 gap-3 origin-left transition-all duration-150 border-[1px] border-zinc-600 rounded-md w-[170px] md:w-[250px] h-[100%] ${
          isNav ? "translate-x-[0px]" : "translate-x-[-300px]"
        }`}
      >
        <div>
          <NavLink
            className="hover:bg-zinc-400 w-[100%] p-2 rounded-sm transition-all duration-300 hover:text-zinc-800 border-b-[1px] border-b-zinc-700 flex justify-center items-center gap-4"
            to="/"
          >
            <FaHome className="" />
            Home
          </NavLink>
          <NavLink
            className="hover:bg-zinc-400 w-[100%] p-2 rounded-sm transition-all duration-300 hover:text-zinc-800 border-b-[1px] border-b-zinc-700 flex justify-center items-center gap-4"
            to="/tweets"
          >
            <FaPencilAlt className="" />
            Tweet
          </NavLink>
          <NavLink
            className="hover:bg-zinc-400 w-[100%] p-2 rounded-sm transition-all duration-300 hover:text-zinc-800 border-b-[1px] border-b-zinc-700 flex justify-center items-center gap-4"
            to="/settings"
          >
            <IoMdSettings />
            Settings
          </NavLink>
        </div>
        <Button type="danger">LogOut</Button>
      </nav>
    </>
  );
}

export default Nav;
