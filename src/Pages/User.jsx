import UserView from "../Component/UserView";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useUserVideo } from "../Hooks/videoHooks/useUserVideo";

function User() {
     const { loadingUser, currentUser } = useGetUser();
     const { userVideos, loadingVideos } = useUserVideo();
     const { data } = userVideos || [];
     return (
          <>
               {(loadingUser || loadingVideos) && <Loader />}
               <UserView
                    username={currentUser?.data?.username}
                    avatar={currentUser?.data?.avatar}
                    subcribersCount={currentUser?.data?.subcribersCount}
                    totalVideos={currentUser?.data?.totalVideos}
               />
               <nav className="w-[100%] px-8 pt-5 border-b-[0.5px] border-zinc-700">
                    <ul className="style-none flex gap-10 ">
                         <li className="cursor-pointer border-b-[1px] border-b-zinc-100">
                              Videos
                         </li>
                         <li className="cursor-pointer">Tweets</li>
                    </ul>
               </nav>
               <div className="w-[80vw] grid py-3 sm:grid-cols-[1fr_1fr] justify-center h-[100%]">
                    {data?.map((v) => (
                         <VideoItems v={v} key={v._id} />
                    ))}
               </div>
          </>
     );
}

export default User;
