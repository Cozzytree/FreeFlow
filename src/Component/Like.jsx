import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import Button from "./Button";
import MiniSpinner from "./MiniSpinner";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

function Like({ totalLikes, handler, loader, liked }) {
   const { currentUser } = useCurrentUser();
   return (
      <div className="flex items-center gap-2">
         {!loader && (
            <>
               {currentUser && (
                  <Button
                     disabled={loader}
                     onClick={handler}
                     extrastyles="w-fit gap-3 p-2"
                     type="like"
                  >
                     {liked ? (
                        <AiFillLike size={10} />
                     ) : (
                        <GrLike size={10} fill="white" />
                     )}
                     <p className="text-xs md:text-[0.9em]">{totalLikes}</p>
                  </Button>
               )}
            </>
         )}
         {loader && <MiniSpinner />}
      </div>
   );
}

export default Like;
