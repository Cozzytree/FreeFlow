import { GrLike } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import Button from "./Button";

function Like() {
  return (
    <Button>
      <GrLike />
      {/* <AiFillLike size={16} /> */}
    </Button>
  );
}

export default Like;
