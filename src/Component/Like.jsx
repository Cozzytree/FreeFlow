import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import Button from "./Button";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useEffect, useState } from "react";

function Like({ totalLikes, handler, loader, liked }) {
   const { currentUser } = useCurrentUser();
   const [like, setLike] = useState(null);

   useEffect(() => {
      const fetchLiked = async () => {
         setLike(liked);
      };
      fetchLiked();
   }, [liked]);

   return (
      <div className="flex items-center gap-2">
         {currentUser && (
            <Button
               disabled={loader}
               onClick={() => {
                  handler();
                  setLike((l) => !l);
               }}
               extrastyles="w-fit gap-3 p-2"
               type="like"
            >
               {like ? (
                  <AiFillLike size={10} />
               ) : (
                  <GrLike size={10} fill="white" />
               )}
               <p className="text-xs md:text-[0.9em]">{totalLikes}</p>
            </Button>
         )}
      </div>
   );
}

export default Like;
