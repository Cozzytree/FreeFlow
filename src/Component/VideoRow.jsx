import { HiOutlineDotsVertical } from "react-icons/hi";
import VideoOptions from "./ItemOptions";
import { useNavigate } from "react-router";

function VideoRow({
   video,
   index,
   handleOptions,
   isOptions,
   options,
   setOption,
}) {
   const navigate = useNavigate();
   const handleNavigate = () => {
      navigate(`/v/${video?._id}`);
   };

   return (
      <div
         draggable={true}
         className="video w-[100%] grid grid-cols-[auto_1fr_1fr_auto] gap-4 bg-zinc-900/40 p-3 rounded-md relative"
      >
         <p>{index + 1}</p>
         <img
            onClick={handleNavigate}
            src={video.thumbnail}
            alt="thumbnail"
            className="w-[200px] h-[100px] object-contain cursor-pointer"
         />
         <div
            onClick={handleNavigate}
            className="grid grid-rows-[1fr_auto] cursor-pointer"
         >
            <h3>{video.title}</h3>
            <h3>{video.user?.username}</h3>
         </div>
         <HiOutlineDotsVertical
            onClick={() => {
               handleOptions(index);
            }}
            className="z-10"
            cursor="pointer"
         />

         {index === isOptions && (
            <VideoOptions setIsOptions={setOption} outsideClose={false}>
               {options && options}
            </VideoOptions>
         )}
      </div>
   );
}

export default VideoRow;
