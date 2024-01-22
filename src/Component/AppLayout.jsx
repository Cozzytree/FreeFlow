import { Outlet } from "react-router";
import Nav from "./Nav";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useState } from "react";
import Loader from "./loader";

function AppLayout() {
     const { currentUser, loadingCurrentUser } = useCurrentUser();
     const [isNav, setIsNav] = useState(false);

     function handleNav() {
          setIsNav((op) => !op);
     }
     //  useEffect(() => {
     //       if (currentUser && !loadingCurrentUser) {
     //            navigate("/");
     //       }
     //  }, [navigate, loadingCurrentUser, currentUser]);
     return (
          <>
               {loadingCurrentUser && <Loader />}
               <div
                    className={`w-full min-h-[100vh] flex justify-center gap-3 font-Changa relative bg-zinc-800 text-zinc-100 text-md`}
               >
                    <Nav
                         user={currentUser?.data}
                         isNav={isNav}
                         setIsNav={handleNav}
                    />

                    <main className="w-[60vw] flex flex-col items-center">
                         <Outlet />
                    </main>
               </div>
          </>
     );
}

export default AppLayout;
