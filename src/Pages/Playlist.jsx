import Loader from "../Component/loader";
import { useGetAplaylist } from "../Hooks/playlistHooks/useGetAplaylist";
import { useDeleteVfromPL } from "../Hooks/playlistHooks/useDelVfromPL";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDeletePlaylist } from "../Hooks/playlistHooks/useDeletePlaylist";
import VideoRow from "../Component/VideoRow";
import ModalProvider from "../Component/Modal";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import AreYouSure from "../Component/AreYouSure";
import { MdDelete } from "react-icons/md";

function Playlist() {
   const [isOptions, setOptions] = useState(null);
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
      setOptions(null);
   }

   function handleOptions(index) {
      setOptions((option) => (option === index ? null : index));
   }

   return (
      <>
         {(isDeleting || isRemoving) && <Loader />}
         <div className="w-[100%] h-[80%] md:h-[100%] gap-5 flex flex-col md:grid grid-cols-[0.5fr_1fr]">
            <div className="w-[100%] h-[100%] flex flex-col overflow-hidden rounded-2xl relative bg-gradient-to-b from-[rgba(156,156,156,0.55)] to-[rgba(0,0,0,0.0)] p-5">
               <div className="w--[100%] flex justify-center">
                  <img
                     src={aPlaylist?.data[0]?.playlistV?.thumbnail}
                     alt=""
                     className="w-[200px] object-cover"
                  />
               </div>
               <h1 className="text-2xl p-4">{aPlaylist?.data[0]?.name}</h1>
               <h2>{aPlaylist?.data[0]?.createdBy.username}</h2>{" "}
               <select className="w-[100px] bg-transparent outline-none border-zinc-400 p-2">
                  <option value="" className="p-2 outline-none bg-transparent">
                     Public
                  </option>
                  <option value="" className="p-2 outline-none bg-transparent">
                     Private
                  </option>
               </select>
               <p>{aPlaylist?.data[0]?.description || "no description"}</p>
            </div>

            {aPlaylist?.data[0]?.playlistV?._id ? (
               <div className="space-y-1 video-container">
                  {aPlaylist?.data?.map((v, i) => (
                     <VideoRow
                        key={i}
                        video={v?.playlistV}
                        index={i}
                        handleOptions={handleOptions}
                        isOptions={isOptions}
                        setOption={setOptions}
                        options={
                           <>
                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="playlist">
                                    <VideoOptionsItem
                                       onClick={open}
                                       label="Remove from Playlist"
                                       icon={<MdDelete fill="red" size={15} />}
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="playlist">
                                    <AreYouSure
                                       label="Are you sure you want to reomve fom playlist ?"
                                       confirm="Yes"
                                       hadler={() =>
                                          handleRemoveV(
                                             v?._id,
                                             v?.playlistV?._id
                                          )
                                       }
                                    ></AreYouSure>
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>

                              <VideoOptionsItem label="Share" />
                           </>
                        }
                     />
                  ))}
               </div>
            ) : (
               <p
                  className="cursor-pointer h-[20px]"
                  onClick={() => navigate("/")}
               >
                  Empty!
                  <span className="border-b-[1px] border-zinc-400">
                     Go To Home &rarr;
                  </span>
               </p>
            )}
         </div>
      </>
   );
}

export default Playlist;
