import { MdOutlineRectangle } from "react-icons/md";

function VideoPlayer({ src }) {
     return (
          <video src={src} className="relative" controls controlsList="">
               <MdOutlineRectangle />
          </video>
     );
}

export default VideoPlayer;
