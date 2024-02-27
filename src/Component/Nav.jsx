import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Button from "./Button";
import { useLogout } from "../Hooks/authHooks/useLogout";
import Loader from "./loader";
import Link from "./Link";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../Hooks/uiHooks/useClickOutside";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import MiniSpinner from "./MiniSpinner";
import Subscription from "./Subscription";
import Playlists from "./Playlists";
import { useGlobalContext } from "../Hooks/context/globalContext";

function Nav() {
   const [isPlaylist, setPlaylist] = useState(false);
   const [isSubscription, setisSubscription] = useState(false);
   const { userLogout, isPending } = useLogout();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   const ref = useRef();
   const { handleNav, isNav, handleCloseNav } = useGlobalContext();

   useClickOutside(ref, handleCloseNav);
   useEffect(() => {
      if (isNav) {
         document.body.classList.add("overflow-hidden");
      } else {
         document.body.classList.remove("overflow-hidden");
      }
   }, [isNav]);

   const handleLogout = () => {
      userLogout();
   };
   return (
      <>
         {isPending && <Loader />}
         <FaBars
            onClick={() => handleNav()}
            className={`${
               isNav ? "rotate-90" : "rotate-0"
            } fixed left-2 top-1 z-[100] transition-all duration-200 size-4 md:size-5`}
            cursor="pointer"
         />
         <div
            className={`w-[100vw] h-[100vh] transition-all duration-300 fixed top-0 left-0 bg-zinc-900/50 animate-slow ${
               isNav ? "opacity-100 z-[99]" : "opacity-0 z-[0]"
            }`}
         >
            <nav
               ref={ref}
               className={`bg-zinc-700 overflow-y-auto flex flex-col justify-between px-5 py-[50px] gap-3 origin-left transition-all duration-300 border-[1px] border-zinc-600 rounded-md w-[170px] md:w-[250px] h-[100vh] ${
                  isNav ? "translate-x-[0]" : "translate-x-[-300px]"
               }`}
            >
               <div className="animate-slow">
                  {currentUser?.data?.username && (
                     <>
                        {loadingCurrentUser && <MiniSpinner />}
                        <Link
                           onClick={handleNav}
                           to={`/u/${currentUser?.data?._id}/videos`}
                        >
                           <img
                              className="w-[30px] h-[30px] object-cover rounded-[100%]"
                              src={currentUser?.data?.avatar}
                              alt=""
                           />
                           <h1 className="text-xl md:text-2xl">
                              {currentUser?.data?.username}
                           </h1>
                        </Link>
                        <Link
                           onClick={handleNav}
                           to={`/${currentUser?.data?._id}/watch_history`}
                        >
                           <PiTelevisionSimpleFill />
                           <h2 className="text-sm md:text-md">Watch history</h2>
                        </Link>
                     </>
                  )}

                  <Link onClick={handleNav} to="/">
                     <FaHome className="" />
                     Home
                  </Link>
                  <Link onClick={handleNav} to={`tweets`}>
                     <FaPencilAlt className="" />
                     Tweet
                  </Link>

                  {currentUser?.data && (
                     <>
                        <Button
                           extrastyles="h-[30px] w-[100%]"
                           onClick={() => setisSubscription((e) => !e)}
                        >
                           Subscription &darr;
                        </Button>
                        {isSubscription && (
                           <Subscription setIsNav={handleNav} />
                        )}
                        <Button
                           onClick={() => setPlaylist((e) => !e)}
                           extrastyles="h-[30px] w-[100%]"
                        >
                           playlists &darr;
                        </Button>
                        {isPlaylist && <Playlists />}
                        <Link onClick={handleNav} to="/settings">
                           <IoMdSettings />
                           Settings
                        </Link>
                     </>
                  )}
               </div>

               {currentUser?.data ? (
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
         </div>
      </>
   );
}

export default Nav;
