import Link from "./Link";
import MiniSpinner from "./MiniSpinner";
import { useUserPlaylists } from "../Hooks/playlistHooks/useGetPlaylists";
import { MdPlaylistPlay } from "react-icons/md";

function Playlists() {
   const { userPlaylists, isLoadingPlaylists } = useUserPlaylists();

   return (
      <ul className="bg-zinc-800 p-1 text-xs">
         {isLoadingPlaylists && <MiniSpinner />}
         {userPlaylists?.data.length >= 0 ? (
            userPlaylists?.data?.map((playlist) => (
               <Link to={`/pl/${playlist?._id}`} key={playlist?._id}>
                  <MdPlaylistPlay size={15} /> {playlist?.name}
               </Link>
            ))
         ) : (
            <p>Empty</p>
         )}
      </ul>
   );
}

export default Playlists;
