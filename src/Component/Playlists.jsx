import { useUserPlaylists } from "../Hooks/playlistHooks/useGetPlaylists";
import Link from "./Link";

function Playlists() {
   const { userPlaylists } = useUserPlaylists();
   if (!userPlaylists?.data?.length) return <p>no playlist</p>;
   return (
      <ul>
         {userPlaylists?.data?.map((playlist) => (
            <Link to={`/pl/${playlist?._id}`} key={playlist?._id}>
               {playlist?.name}
            </Link>
         ))}
      </ul>
   );
}

export default Playlists;
