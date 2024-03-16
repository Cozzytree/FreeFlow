import { useState } from "react";
import { useUserPlaylists } from "../Hooks/playlistHooks/useGetPlaylists";
import Button from "./Button";
import MiniSpinner from "./MiniSpinner";
import { useCreatePlaylist } from "../Hooks/playlistHooks/useCreatePlaylist";
import { useAddVtoPL } from "../Hooks/playlistHooks/useAddVtoPL";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { useDeleteVfromPL } from "../Hooks/playlistHooks/useDelVfromPL";

function PlaylistItem({ videoId }) {
   const [isForm, setForm] = useState(false);
   const { handleSubmit, register, reset } = useForm();
   const { userPlaylists, isLoadingPlaylists } = useUserPlaylists(videoId);
   const { isRemoving, removeV } = useDeleteVfromPL();
   const { userCreatePlaylist, creatingPlaylist } = useCreatePlaylist();
   const { userAddVtoPL, isAddingVtoPl } = useAddVtoPL();

   function handleCreatePlaylist(data) {
      userCreatePlaylist(data);
      reset();
   }

   function handlePublished(exist) {
      if (!exist) {
         userAddVtoPL({
            playlistId: userPlaylists?.data[0]?._id,
            videoId,
         });
      } else {
         removeV({ playlistId: userPlaylists?.data[0]?._id, videoId });
      }
   }

   return (
      <div className="modal grid grid-rows-[1fr_1fr_auto] gap-3 items-center h-auto min-w-[200px]">
         {isLoadingPlaylists || (isRemoving && <MiniSpinner />)}
         {!userPlaylists?.data?.length && (
            <p className="text-zinc-50">no playlists</p>
         )}

         <ul className="list-none text-zinc-50 w-[100%] text-center flex flex-col justify-center">
            {userPlaylists?.data?.length > 0 &&
               userPlaylists?.data?.map((play) => (
                  <li
                     className="modal w-full p-1 border-b-[0.5px] border-b-zinc-600 grid grid-cols-[auto_1fr]"
                     key={play?._id}
                  >
                     <input
                        disabled={isAddingVtoPl}
                        onChange={() => handlePublished(play?.exist)}
                        type="checkbox"
                        id={play?.name}
                        defaultChecked={play?.exist || false}
                     />
                     <label htmlFor={play?.name} id={play?.name}>
                        {play?.name}
                     </label>
                  </li>
               ))}
         </ul>

         <form
            onSubmit={handleSubmit(handleCreatePlaylist)}
            className={`modal ${
               isForm ? "block" : "hidden"
            } transition-[opacity] flex flex-col items-center gap-3`}
         >
            <FormInput
               required={true}
               id="name"
               register={register}
               placeholder="title..."
            />
            <Button
               disabled={creatingPlaylist}
               type="primary"
               extrastyles="rounded-sm"
            >
               SAVE
            </Button>
         </form>

         <Button
            onClick={() => setForm((form) => !form)}
            type="primary"
            extrastyles="h-[30px] rounded-sm"
         >
            make a playlist
         </Button>
      </div>
   );
}

export default PlaylistItem;
