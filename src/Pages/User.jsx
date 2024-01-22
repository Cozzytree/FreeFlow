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
               <div className="w-[80vw] flex gap-4 py-9">
                    <img
                         className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] rounded-[100%]"
                         src={currentUser?.data?.avatar}
                         alt=""
                    />
                    <div className="flex flex-col">
                         <h1 className="text-2xl md:text-3xl font-bold">
                              {currentUser?.data?.username}
                         </h1>
                         <span className="text-zinc-400">
                              subscribers {currentUser?.data?.subcribersCount}
                         </span>
                         <span className="text-zinc-400">
                              video {currentUser?.data?.totalVideos}{" "}
                         </span>
                    </div>
               </div>

               <div className="w-[60vw] grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] h-[100%]">
                    {data?.map((v) => (
                         <VideoItems v={v} key={v._id} />
                    ))}
               </div>
          </>
     );
}

export default User;
