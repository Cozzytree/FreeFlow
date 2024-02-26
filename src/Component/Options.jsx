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
import Input from "./Input";
import PlaylistItem from "./PlaylistItem";
import { share } from "../utils/share";

function Options({
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
   const [content, setContent] = useState(tweetEdit?.tweet);
   const [title, setTitle] = useState(videoEdit?.title);
   const [description, setDescription] = useState(videoEdit?.description || "");
   const [thumbnail, setThumbnail] = useState(null);

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
                                       onSubmit={(e) => {
                                          e.preventDefault();
                                          if (tweetEdit?.tweet !== content) {
                                             tweetEdit?.editHandler(
                                                tweetEdit?.tweetId,
                                                {
                                                   content: content,
                                                }
                                             );
                                             setContent(content);
                                          }
                                       }}
                                       className="flex flex-col items-center gap-3"
                                    >
                                       <Input
                                          setState={setContent}
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
                                          onSubmit={(e) => {
                                             videoEdit?.handler(
                                                e,
                                                videoEdit?.videoId,
                                                {
                                                   title,
                                                   description,
                                                }
                                             );
                                          }}
                                          className="flex flex-col text-zinc-50 items-center gap-3"
                                       >
                                          <Input
                                             setState={setTitle}
                                             defaultValue={title}
                                          />

                                          <textarea
                                             onChange={(e) =>
                                                setDescription(e.target.value)
                                             }
                                             className="bg-transparent outline-none border-[0.5px] border-zinc-400 rounded-md p-2 text-zinc-100"
                                             defaultValue={description}
                                             cols="30"
                                             placeholder="description..."
                                          ></textarea>
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
