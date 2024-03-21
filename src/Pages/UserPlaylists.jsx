import UserView from "../Component/UserView";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import Loader from "../Component/loader";
import { useParams } from "react-router";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { usePublicPlaylist } from "../Hooks/playlistHooks/usePublicPlaylist";

function UserPlaylists() {
   const params = useParams();
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const { loadingUser, currentUser, refetch } = useGetUser();
   const { isGettingpPlaylist, playlistError, publicPlaylists } =
      usePublicPlaylist(params?.userId);
   return (
      <>
         {(loadingUser || loadingCurrentUser) && <Loader />}
         <UserView
            bio={currentUser?.data?.bio}
            userId={cu?.data?._id}
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
         />
         <TweetsVideoToggle params={params} />
      </>
   );
}

export default UserPlaylists;
