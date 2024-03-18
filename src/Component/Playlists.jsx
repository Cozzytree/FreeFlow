import Link from "./Link";
import MiniSpinner from "./MiniSpinner";
import { MdPlaylistPlay } from "react-icons/md";
import { usePlaylistNames } from "../Hooks/playlistHooks/usePlaylistNames";

function Playlists() {
   const { playlistNames, isLoading } = usePlaylistNames();

   return (
      <ul className="bg-zinc-800 p-1 text-xs">
         {isLoading && <MiniSpinner />}
         {playlistNames?.data.length >= 0 ? (
            playlistNames?.data?.map((playlist) => (
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
