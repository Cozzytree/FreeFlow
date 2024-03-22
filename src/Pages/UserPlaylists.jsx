import { useParams } from "react-router";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

import { usePublicPlaylist } from "../Hooks/playlistHooks/usePublicPlaylist";

function UserPlaylists() {
   const params = useParams();
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const { isGettingpPlaylist, playlistError, publicPlaylists } =
      usePublicPlaylist(params?.userId);
   return <></>;
}

export default UserPlaylists;
