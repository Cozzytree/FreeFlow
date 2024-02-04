import { useState } from "react";
import { useUserPlaylists } from "../Hooks/playlistHooks/useGetPlaylists";
import Button from "./Button";
import MiniSpinner from "./MiniSpinner";
import Input from "./Input";
import { useCreatePlaylist } from "../Hooks/playlistHooks/useCreatePlaylist";
import { useAddVtoPL } from "../Hooks/playlistHooks/useAddVtoPL";

function PlaylistItem({ videoId }) {
   const { userPlaylists, isLoadingPlaylists } = useUserPlaylists();
   const { userCreatePlaylist, creatingPlaylist } = useCreatePlaylist();
   const { userAddVtoPL } = useAddVtoPL();
   const [isForm, setForm] = useState(false);
   const [name, setName] = useState("");

   function handleCreatePlaylist(e, title) {
      e.preventDefault();
      userCreatePlaylist(title);
   }

   function handleAddVtoP(playlistId, videoId) {
      userAddVtoPL({ playlistId, videoId });
   }

   return (
      <div className="grid grid-rows-[1fr_1fr_auto] gap-3 items-center h-[200px] min-w-[200px]">
         {isLoadingPlaylists && <MiniSpinner />}
         {!userPlaylists?.data?.length && (
            <p className="text-zinc-50">no playlists</p>
         )}

         <ul className="list-none text-zinc-50 w-[100%] text-center">
            {userPlaylists?.data?.map((play) => (
               <li
                  onClick={() => handleAddVtoP(play?._id, videoId)}
                  className="cursor-pointer p-1 border-b-[0.5px] border-b-zinc-600"
                  key={play?._id}
               >
                  {play?.name}
               </li>
            ))}
         </ul>

         {isForm && (
            <form
               onSubmit={(e) => handleCreatePlaylist(e, { name })}
               className="flex flex-col items-center gap-3"
            >
               <Input setState={setName} placeholder="title..." />
               <Button
                  disabled={creatingPlaylist}
                  type="primary"
                  extrastyles="rounded-sm"
               >
                  SAVE
               </Button>
            </form>
         )}

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
