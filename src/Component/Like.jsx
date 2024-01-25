import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import Button from "./Button";
import MiniSpinner from "./MiniSpinner";

function Like({ totalLikes, handler, loader, liked }) {
     console.log(liked);
     return (
          <div className="flex items-center gap-2">
               {!loader ? (
                    <Button disabled={loader} onClick={handler} type="like">
                         {liked ? <AiFillLike /> : <GrLike size={10} />}
                    </Button>
               ) : (
                    <MiniSpinner />
               )}

               <p className="text-xs md:text-[0.9em]">
                    {totalLikes === 0 ? "No Likes yet" : `${totalLikes} likes`}
               </p>
          </div>
     );
}

export default Like;
