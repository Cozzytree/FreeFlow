import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import OptionsItem from "./OptionsItem";
import ModalProvider from "./Modal";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import Button from "./Button";
import { useState } from "react";
import MiniSpinner from "./MiniSpinner";
import AreYouSure from "./AreYouSure";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import PlaylistItem from "./PlaylistItem";
import { share } from "../utils/share";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

function Options({
   Isshare = true,
   handleOptions,
   userId,
   deleteHandler,
   currentItem,
   tweetEdit,
   videoEdit,
   type,
   deleteBtnLabel,
}) {
   const { currentUser } = useCurrentUser();
   const { handleSubmit, register } = useForm();
   const [thumbnail, setThumbnail] = useState(null);

   const tweetUpdate = (data) => {
      tweetEdit?.editHandler(tweetEdit?.tweetId, data);
   };

   const videoUpdate = (data) => {
      videoEdit?.handler(videoEdit?.videoId, data);
   };

   return (
      <div className="absolute right-2 top-1 flex flex-col justify-end items-end text-sm rotate-90">
         <ModalProvider>
            <ModalProvider.ModalOpen opens="options">
               <HiOutlineDotsVertical
                  className="cursor-pointer"
                  onClick={handleOptions}
               />
            </ModalProvider.ModalOpen>
            <ModalProvider.ModalWindow window="options" clickOutside={false}>
               {Isshare && (
                  <OptionsItem>
                     <FaShare
                        onClick={() =>
                           share({
                              title: document.title,
                              text: "Check out this amazing content!",
                              url: document.URL,
                           })
                        }
                     />
                     Share
                  </OptionsItem>
               )}

               {currentUser?.data?._id === userId && userId !== undefined && (
                  <>
                     {(tweetEdit || videoEdit) && (
                        <OptionsItem>
                           <ModalProvider>
                              <ModalProvider.ModalOpen opens="input">
                                 <button className="flex gap-4 items-center">
                                    <FaEdit /> Edit
                                 </button>
                              </ModalProvider.ModalOpen>
                              <ModalProvider.ModalWindow
                                 window="input"
                                 clickOutside={false}
                              >
                                 {/* {tweet edit window} */}
                                 {tweetEdit && (
                                    <form
                                       onSubmit={handleSubmit(tweetUpdate)}
                                       className="flex flex-col items-center gap-3"
                                    >
                                       <FormInput
                                          id="content"
                                          type="text"
                                          register={register}
                                          placeholder="hello"
                                          defaultValue={tweetEdit?.tweet}
                                       />
                                       <Button
                                          disabled={tweetEdit?.loading}
                                          extrastyles="rounded-sm h-[30px]"
                                          type="primary"
                                       >
                                          {tweetEdit?.loading ? (
                                             <MiniSpinner />
                                          ) : (
                                             "SAVE"
                                          )}
                                       </Button>
                                    </form>
                                 )}

                                 {/* {video edit window} */}
                                 {videoEdit && (
                                    <>
                                       <label
                                          htmlFor="thumbnail"
                                          className="text-zinc-50 p-4 cursor-pointer space-x-4"
                                       >
                                          Change thumbnail
                                          <input
                                             onChange={(e) =>
                                                setThumbnail(e.target.files[0])
                                             }
                                             className="hidden"
                                             type="file"
                                             accept="image.jpg image.png"
                                             id="thumbnail"
                                          />
                                       </label>
                                       {thumbnail && (
                                          <Button
                                             onClick={() => {
                                                videoEdit?.upThumbnail(
                                                   videoEdit?.videoId,
                                                   thumbnail
                                                );
                                                setThumbnail("");
                                             }}
                                             extrastyles="text-green-500 font-extrabold"
                                          >
                                             <FaCheck />
                                          </Button>
                                       )}

                                       <form
                                          onSubmit={handleSubmit(videoUpdate)}
                                          className="flex flex-col text-zinc-50 items-center gap-3"
                                       >
                                          <FormInput
                                             id="title"
                                             register={register}
                                             placeholder="Title"
                                             defaultValue={videoEdit?.title}
                                          />
                                          <FormInput
                                             id="description"
                                             register={register}
                                             defaultValue={
                                                videoEdit?.description
                                             }
                                             placeholder="description..."
                                          />

                                          <label
                                             className="flex gap-2 transition-all"
                                             htmlFor="isPublished"
                                          >
                                             Published
                                             <input
                                                defaultChecked={
                                                   videoEdit?.published
                                                }
                                                type="checkbox"
                                                name=""
                                                id="isPublished"
                                                {...register("isPublished")}
                                             />
                                          </label>

                                          <Button
                                             disabled={videoEdit?.loader}
                                             type="primary"
                                             extrastyles="rounded-sm h-[40px]"
                                          >
                                             {videoEdit?.loader ? (
                                                <MiniSpinner />
                                             ) : (
                                                "SAVE"
                                             )}
                                          </Button>
                                       </form>
                                    </>
                                 )}
                              </ModalProvider.ModalWindow>
                           </ModalProvider>
                        </OptionsItem>
                     )}

                     <OptionsItem>
                        <ModalProvider>
                           <ModalProvider.ModalOpen opens="delete">
                              <Button type="danger">
                                 <MdDelete />
                                 {deleteBtnLabel ? deleteBtnLabel : "Delete"}
                              </Button>
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow
                              window="delete"
                              clickOutside={false}
                           >
                              <AreYouSure label="Are you sure you want to remove?">
                                 <Button
                                    onClick={() => {
                                       deleteHandler(currentItem);
                                    }}
                                    type="danger"
                                 >
                                    {deleteBtnLabel ? deleteBtnLabel : "Delete"}
                                 </Button>
                              </AreYouSure>
                           </ModalProvider.ModalWindow>
                        </ModalProvider>
                     </OptionsItem>
                  </>
               )}

               {currentUser && type === "video" && (
                  <OptionsItem>
                     <ModalProvider>
                        <ModalProvider.ModalOpen opens="playlist">
                           <Button type="primary" extrastyles="rounded-md">
                              <MdOutlinePlaylistAdd size={20} />
                           </Button>
                        </ModalProvider.ModalOpen>
                        <ModalProvider.ModalWindow window="playlist">
                           <PlaylistItem videoId={videoEdit?.videoId} />
                        </ModalProvider.ModalWindow>
                     </ModalProvider>
                  </OptionsItem>
               )}
            </ModalProvider.ModalWindow>
         </ModalProvider>
      </div>
   );
}

export default Options;
