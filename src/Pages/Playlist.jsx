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
import { MdDelete, MdEdit, MdShare } from "react-icons/md";
import VideoOptions from "../Component/ItemOptions";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEditPlayName } from "../Hooks/playlistHooks/useEditPlayName";
import { useForm } from "react-hook-form";
import FormInput from "../Component/FormInput";
import Button from "../Component/Button";
import FormTextArea from "../Component/FormTextArea";
import { useEditDescription } from "../Hooks/playlistHooks/useEditDescription";

function Playlist() {
   const [isOptions, setOptions] = useState(null);
   const [playlistOptions, setPlaylistOptions] = useState(null);
   const { handleSubmit, register } = useForm();
   const params = useParams();
   const navigate = useNavigate();
   const { aPlaylist, loadingPlaylist, refetch } = useGetAplaylist();
   const { isDeleting, userDeletePlaylist } = useDeletePlaylist();
   const { editPlaylistName, isEditing } = useEditPlayName();
   const { editPlaylistDescription, isEditingDescrip } = useEditDescription();
   const { removeV, isRemoving } = useDeleteVfromPL();

   useEffect(() => {
      refetch();
   }, [params?.playlistId, refetch]);

   function handleRemoveV(playlistId, videoId) {
      removeV({ playlistId, videoId });
      refetch();
      setOptions(null);
   }

   function handlePlaylistOptions() {
      setPlaylistOptions((option) => (option === 0 ? null : 0));
   }

   function handleOptions(index) {
      setOptions((option) => (option === index ? null : index));
   }

   function reload() {
      setPlaylistOptions(null);
      refetch();
   }

   function handleEditName() {
      return (data) => {
         if (aPlaylist?.data[0]?.name === data?.name) return;
         editPlaylistName(
            { playlistId: params?.playlistId, name: data },
            { onSuccess: () => reload() }
         );
      };
   }

   function handleEditDescription() {
      return (data) => {
         if (aPlaylist?.data[0]?.description === data?.description) return;
         editPlaylistDescription(
            {
               playlistId: params?.playlistId,
               description: data,
            },
            {
               onSuccess: () => reload(),
            }
         );
      };
   }

   return (
      <>
         {(isDeleting || isRemoving || loadingPlaylist) && <Loader />}
         <div className="w-[100%] h-[90%] md:h-[100%] gap-5 flex flex-col md:grid grid-cols-[0.5fr_1fr]">
            <div className="w-[100%] h-[100%] flex flex-col overflow-hidden rounded-2xl relative bg-gradient-to-b from-[rgba(156,156,156,0.55)] to-[rgba(0,0,0,0.0)] p-5 gap-4">
               <div className="w--[100%] flex justify-center">
                  <img
                     src={aPlaylist?.data[0]?.playlistV?.thumbnail}
                     alt=""
                     className="w-[150px] md:w-[200px] object-cover"
                  />
               </div>
               <h1 className="text-2xl">{aPlaylist?.data[0]?.name}</h1>
               <h2>{aPlaylist?.data[0]?.createdBy.username}</h2>

               <div className="flex relative items-center justify-between w-[80%]">
                  <select className="bg-zinc-800 p-2 rounded-md">
                     <option className="bg-transparent">Public</option>
                     <option className="bg-transparent">Private</option>
                  </select>
                  <HiOutlineDotsVertical
                     cursor="pointer"
                     onClick={handlePlaylistOptions}
                  />
                  {playlistOptions === 0 && (
                     <VideoOptions setIsOptions={setPlaylistOptions}>
                        {/* {edit playlist name } */}
                        <ModalProvider>
                           <ModalProvider.ModalOpen opens="editName">
                              <VideoOptionsItem
                                 label="Name"
                                 icon={<MdEdit className="w-full" />}
                              />
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow window="editName">
                              <form
                                 onSubmit={handleSubmit(handleEditName())}
                                 className="modal grid grid-cols-1 grid-rows-2 gap-2 justify-items-center"
                              >
                                 <FormInput
                                    type="text"
                                    register={register}
                                    required={true}
                                    defaultValue={aPlaylist?.data[0]?.name}
                                    id="name"
                                    placeholder="playlist name..."
                                 />
                                 <Button
                                    disabled={isEditing}
                                    type="primary"
                                    extrastyles="h-[25px] rounded-md"
                                 >
                                    Save
                                 </Button>
                              </form>
                           </ModalProvider.ModalWindow>
                        </ModalProvider>

                        {/* {edit description} */}
                        <ModalProvider>
                           <ModalProvider.ModalOpen opens="editDescription">
                              <VideoOptionsItem
                                 label="Description"
                                 icon={<MdEdit className="w-full" />}
                              />
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow window="editDescription">
                              <form
                                 onSubmit={handleSubmit(
                                    handleEditDescription()
                                 )}
                                 className="modal grid grid-cols-1 grid-rows-2 gap-2 justify-items-center"
                              >
                                 <FormTextArea
                                    id="description"
                                    register={register}
                                    required={true}
                                    defaultValue={
                                       aPlaylist?.data[0]?.description
                                    }
                                    placeholder="description..."
                                 />
                                 <Button
                                    disabled={isEditingDescrip}
                                    type="primary"
                                    extrastyles="rounded-md h-[25px]"
                                 >
                                    SAVE
                                 </Button>
                              </form>
                           </ModalProvider.ModalWindow>
                        </ModalProvider>

                        {/* { delete playlist} */}
                        <ModalProvider>
                           <ModalProvider.ModalOpen opens="deletePlay">
                              <VideoOptionsItem
                                 label="Delete playlist"
                                 icon={
                                    <MdDelete className="w-full" fill="red" />
                                 }
                              />
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow window="deletePlay">
                              <AreYouSure
                                 label="Are you sure you want to delete the playlist?"
                                 hadler={() =>
                                    userDeletePlaylist(params?.playlistId)
                                 }
                                 confirm="CONFIRM"
                                 loader={isDeleting}
                              />
                           </ModalProvider.ModalWindow>
                        </ModalProvider>

                        <VideoOptionsItem
                           label="Share"
                           icon={<MdShare className="w-full" />}
                        />
                     </VideoOptions>
                  )}
               </div>

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
                                       label="Remove"
                                       icon={
                                          <MdDelete
                                             fill="red"
                                             size={15}
                                             className="w-[100%]"
                                          />
                                       }
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
