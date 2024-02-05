import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Button from "./Button";
import { useLogout } from "../Hooks/authHooks/useLogout";
import Loader from "./loader";
import Link from "./Link";
import { useRef, useState } from "react";
import { useClickOutside } from "../Hooks/uiHooks/useClickOutside";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import MiniSpinner from "./MiniSpinner";
import { useUserPlaylists } from "../Hooks/playlistHooks/useGetPlaylists";

function Nav({ isNav, setIsNav, handleCloseNav }) {
   const [isPlaylist, setPlaylist] = useState(false);
   const { userLogout, isPending } = useLogout();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   const { userPlaylists } = useUserPlaylists();
   const ref = useRef();
   useClickOutside(ref, handleCloseNav);
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
            } fixed left-2 top-1 z-[999] transition-all duration-200 size-4 md:size-5`}
            cursor="pointer"
         />
         <div
            className={`w-[100vw] h-[100vh] fixed bg-zinc-900/50 animate-slow z-[998] ${
               isNav ? "block" : "hidden"
            }`}
         >
            <nav
               ref={ref}
               className={`bg-zinc-700 z-10 flex flex-col items- justify-between px-5 py-[50px] gap-3 origin-left transition-all duration-1000 border-[1px] border-zinc-600 rounded-md w-[170px] md:w-[250px] h-[100vh] ${
                  isNav ? "translate-x-[0]" : "translate-x-[-300px]"
               }`}
            >
               <div className=" animate-slow ">
                  {currentUser?.data?.username && (
                     <>
                        {loadingCurrentUser && <MiniSpinner />}
                        <Link to={`/u/${currentUser?.data?._id}/videos`}>
                           <img
                              className="w-[30px] h-[30px] object-cover rounded-[100%]"
                              src={currentUser?.data?.avatar}
                              alt=""
                           />
                           <h1 className="text-sm">
                              {currentUser?.data?.username}
                           </h1>
                        </Link>
                        <Link to={`/${currentUser?.data?._id}/watch_history`}>
                           <PiTelevisionSimpleFill />
                           <h2 className="text-sm md:text-md">Watch history</h2>
                        </Link>
                     </>
                  )}

                  <Link to="/">
                     <FaHome className="" />
                     Home
                  </Link>
                  <Link to={`tweets`}>
                     <FaPencilAlt className="" />
                     Tweet
                  </Link>

                  {currentUser && (
                     <>
                        <Button
                           onClick={() => setPlaylist((e) => !e)}
                           extrastyles="h-[30px] w-[100%]"
                        >
                           playlists &darr;
                        </Button>
                        {isPlaylist && (
                           <ul>
                              {userPlaylists?.data?.map((playlist) => (
                                 <Link
                                    to={`/pl/${playlist?._id}`}
                                    key={playlist?._id}
                                 >
                                    {playlist?.name}
                                 </Link>
                              ))}
                           </ul>
                        )}
                        <Link to="/settings">
                           <IoMdSettings />
                           Settings
                        </Link>
                     </>
                  )}
               </div>

               {currentUser ? (
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
