import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Button from "./Button";
import { useLogout } from "../Hooks/authHooks/useLogout";
import Loader from "./loader";
import Link from "./Link";

function Nav({ user, isNav, setIsNav }) {
     const { userLogout, isPending } = useLogout();
     const handleLogout = () => {
          userLogout();
     };

     return (
          <>
               {isPending && <Loader />}
               <FaBars
                    onClick={() => setIsNav()}
                    className={`${
                         isNav ? "rotate-90" : "rotate-0"
                    } fixed left-2 top-1 z-[20] transition-all duration-200 size-6`}
                    cursor="pointer"
               />
               <nav
                    className={`fixed top-0 left-0 bg-zinc-700 z-10 flex flex-col items- justify-between px-5 py-[50px] gap-3 origin-left transition-all duration-250 border-[1px] border-zinc-600 rounded-md w-[170px] md:w-[250px] h-[100%] ${
                         isNav ? "translate-x-[0px]" : "translate-x-[-300px]"
                    }`}
               >
                    <div className=" animate-slow ">
                         {user?.username && (
                              <Link to={`/u/${user?.username}`}>
                                   <img
                                        className="w-[30px] h-[30px] object-cover rounded-[100%]"
                                        src={user?.avatar}
                                        alt=""
                                   />
                                   <h1 className="text-sm">{user?.username}</h1>
                              </Link>
                         )}

                         <Link to="/">
                              <FaHome className="" />
                              Home
                         </Link>
                         <Link to="/tweets">
                              <FaPencilAlt className="" />
                              Tweet
                         </Link>

                         {user && (
                              <Link to="/settings">
                                   <IoMdSettings />
                                   Settings
                              </Link>
                         )}
                    </div>
                    {user ? (
                         <Button onClick={handleLogout} type="danger">
                              LogOut
                         </Button>
                    ) : (
                         <div>
                              <Link to="/login">Login</Link>
                              <Link to="/signUp">SignUp</Link>
                         </div>
                    )}
               </nav>
          </>
     );
}

export default Nav;
