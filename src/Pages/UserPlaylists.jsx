import MiniSpinner from "../Component/MiniSpinner";
import { useNavigate, useParams } from "react-router";
import { usePublicPlaylist } from "../Hooks/playlistHooks/usePublicPlaylist";

function UserPlaylists() {
   const navigate = useNavigate();
   const params = useParams();
   const { isGettingpPlaylist, publicPlaylists } = usePublicPlaylist(
      params?.userId
   );
   return (
      <div className="w-full max-h-[300px] grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr]">
         {isGettingpPlaylist && <MiniSpinner />}
         {publicPlaylists?.data?.playListVideos.map((play) => (
            <div
               onClick={() => navigate(`/pl/${play?._id}`)}
               className="cursor-pointer h-[200px]"
               key={play?._id}
            >
               <img
                  src={play?.playlistVideos?.thumbnail}
                  alt={play?.name}
                  className="rounded-md"
               />
               <h1>{play?.name}</h1>
               <h2>{play?.owner[0]?.username[0]}</h2>
            </div>
         ))}
      </div>
   );
}

export default UserPlaylists;
