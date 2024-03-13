import { useGetVideoComments } from "../Hooks/commentHooks/getVideoComments";
import MiniSpinner from "./MiniSpinner";
import { time } from "../utils/time";
import { useAddVideoComment } from "../Hooks/commentHooks/useAddComment";
import { useParams } from "react-router";
import { useDeleteVideoComment } from "../Hooks/commentHooks/useDeleteVideoComment";
import CommentForm from "./CommentForm";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import VideoOptions from "./ItemOptions";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import VideoOptionsItem from "./VideoOptionsItem";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalProvider from "./Modal";
import AreYouSure from "./AreYouSure";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import Button from "./Button";

function VideoComments() {
   const [isOptions, setOption] = useState(null);
   const { handleSubmit, register } = useForm();
   const { currentUser } = useCurrentUser();
   const { videoComments, isLoading } = useGetVideoComments();
   const { addComment, isComenting } = useAddVideoComment();
   const { deleteComment, isDeleting } = useDeleteVideoComment();
   const params = useParams();

   function handleaddComment(videoId, content) {
      addComment({ videoId, content });
   }

   function handleDeleteComment(commentId) {
      deleteComment(commentId, { onSuccess: () => setOption(null) });
   }

   function handleOption(index) {
      setOption((option) => (option === index ? null : index));
   }

   return (
      <div className="overflow-y-auto max-h-[200px] px-2 overflow-hidden">
         {isLoading && <MiniSpinner />}

         <div
            className={`transition-all duration-200 space-y-2 flex flex-col items-center`}
         >
            {/* {form for commrnt} */}

            <CommentForm
               handler={(content) => handleaddComment(params?.videoId, content)}
               isLoading={isComenting}
            />

            {/* {comments} */}
            {(isComenting || isDeleting) && <MiniSpinner />}
            {videoComments?.pages[0]?.data?.data?.map((comment, index) => (
               <div
                  key={comment._id}
                  className="grid grid-cols-[auto_1fr_auto] gap-5 pb-5 w-[100%] relative p-3"
               >
                  <img
                     src={comment?.user?.avatar}
                     alt="image"
                     className="w-[30px] h-[30px] rounded-[100%]"
                  />
                  <div className="space-y-2">
                     <h2 className="text-sm md:text-[1.2em]">
                        {comment?.user?.username}
                        <span className="text-sm px-3 text-zinc-300">
                           {time(comment?.createdAt)}
                        </span>
                     </h2>
                     <p className="text-zinc-300 text-sm md:text-[1em]">
                        {comment?.content}
                     </p>
                  </div>

                  {currentUser?.data?._id === comment?.user?._id && (
                     <>
                        <HiOutlineDotsVertical
                           cursor="pointer"
                           onClick={() => handleOption(index)}
                        />
                        {index === isOptions && (
                           <VideoOptions setIsOptions={setOption}>
                              <ModalProvider>
                                 <ModalProvider.ModalOpen>
                                    <VideoOptionsItem
                                       label="Edit"
                                       icon={
                                          <MdEdit
                                             className="w-full"
                                             seed={15}
                                          />
                                       }
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow>
                                    <form
                                       onSubmit={handleSubmit()}
                                       className="modal grid grid-rows-2 gap-2 place-items-center"
                                    >
                                       <FormInput
                                          defaultValue={comment?.content}
                                          type="text"
                                          placeholder="comment..."
                                          register={register}
                                          required={true}
                                          id="content"
                                       />
                                       <Button
                                          type="primary"
                                          extrastyles="rounded-md h-[25px]"
                                       >
                                          SAVE
                                       </Button>
                                    </form>
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>

                              <ModalProvider>
                                 <ModalProvider.ModalOpen>
                                    <VideoOptionsItem
                                       label="Delete"
                                       icon={
                                          <MdDelete
                                             fill="red"
                                             size={15}
                                             className="w-full"
                                          />
                                       }
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow>
                                    <AreYouSure
                                       hadler={() =>
                                          handleDeleteComment(comment?._id)
                                       }
                                       label="Are you sure you want to delete the comment ?"
                                       confirm="DELETE"
                                       loader={isDeleting}
                                    />
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>
                           </VideoOptions>
                        )}
                     </>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}

export default VideoComments;
