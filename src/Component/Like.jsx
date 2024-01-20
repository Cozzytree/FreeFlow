import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import Button from "./Button";

function Like({ totalLikes }) {
  return (
    <div className="flex items-center gap-2">
      <Button type="like">
        <GrLike size={10} />
      </Button>
      <p className="text-xs md:text-[0.9em]">
        {totalLikes === 0 ? "No Likes yet" : `${totalLikes} likes`}
      </p>
    </div>
  );
}

export default Like;
