import { useNavigate } from "react-router";

function VideoItems({ v }) {
     const navigate = useNavigate();
     return (
          <div
               className="min-w-[200px] flex flex-col gap-1 cursor-pointer"
               onClick={() => {
                    navigate(`/v/${v?._id}`);
               }}
          >
               <img src={v.thumbnail} alt="" className="rounded-md" />
               <p>{v.title}</p>
          </div>
     );
}

export default VideoItems;
