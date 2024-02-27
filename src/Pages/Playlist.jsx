import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useGetAplaylist } from "../Hooks/playlistHooks/useGetAplaylist";
import Options from "../Component/Options";
import { useDeleteVfromPL } from "../Hooks/playlistHooks/useDelVfromPL";
import { useNavigate, useParams } from "react-router";
import Button from "../Component/Button";
import ModalProvider from "../Component/Modal";
import AreYouSure from "../Component/AreYouSure";
import { useEffect } from "react";
import { useDeletePlaylist } from "../Hooks/playlistHooks/useDeletePlaylist";

function Playlist() {
   const params = useParams();
   const navigate = useNavigate();
   const { aPlaylist, loadingPlaylist, refetch } = useGetAplaylist();
   const { isDeleting, userDeletePlaylist } = useDeletePlaylist();
   const { removeV, isRemoving } = useDeleteVfromPL();

   useEffect(() => {
      refetch();
   }, [params?.playlistId, refetch]);

   function handleRemoveV(playlistId, videoId) {
      removeV({ playlistId, videoId });
      refetch();
   }

   return (
      <>
         {(isDeleting || isRemoving) && <Loader />}
         <ModalProvider>
            <ModalProvider.ModalOpen opens="play">
               <Button
                  type="danger"
                  extrastyles="absolute h-[20px] right-10 top-20 text-xs rounded-sm"
               >
                  Delete playlist
               </Button>
            </ModalProvider.ModalOpen>
            <ModalProvider.ModalWindow window="play" clickOutside={false}>
               <AreYouSure label="Are you sure you want to delete the playlist?">
                  <Button
                     onClick={() => userDeletePlaylist(aPlaylist?.data[0]?._id)}
                     type="danger"
                  >
                     Delete
                  </Button>
               </AreYouSure>
            </ModalProvider.ModalWindow>
         </ModalProvider>

         <div className="w-[100%] px-10">
            <h1 className="border-b-[1px] text-xl md:text-2xl border-zinc-500">
               {aPlaylist?.data[0]?.name}
            </h1>
            <span className="text-sm text-zinc-400">created by </span>
            <h1
               onClick={() =>
                  navigate(`/u/${aPlaylist?.data[0]?.createdBy?._id}/videos`)
               }
               className="text-md md:text-2xl font-bold text-sky-600 cursor-pointer underline px-10"
            >
               {aPlaylist?.data[0]?.createdBy?.username}
            </h1>
         </div>

         <div className="w-[90vw] grid grid-cols-[auto_auto_auto] justify-start">
            {loadingPlaylist && <Loader />}
            {aPlaylist?.data.length >= 1 &&
            aPlaylist?.data[0]?.playlistV?._id ? (
               <>
                  {aPlaylist?.data?.map((playlist, i) => (
                     <VideoItems
                        v={playlist?.playlistV}
                        key={i}
                        options={false}
                     >
                        <Options
                           deleteBtnLabel="remove from playlist"
                           userId={playlist?.createdBy?._id}
                           deleteHandler={() =>
                              handleRemoveV(
                                 playlist?._id,
                                 playlist?.playlistV?._id
                              )
                           }
                        />
                     </VideoItems>
                  ))}
               </>
            ) : (
               <p className="text-red-400 text-center w-[100%]">
                  EMPTY PLAYLIST
                  <span
                     onClick={() => navigate("/")}
                     className="text-sky-600 cursor-pointer"
                  >
                     add some
                  </span>
               </p>
            )}
         </div>
      </>
   );
}

export default Playlist;
