import { useParams } from "react-router";
import { useSubscribe } from "../Hooks/subscribeHooks/useSubscribeHooks";
import { AiOutlineUpload } from "react-icons/ai";
import Button from "./Button";
import InputFile from "./InputFile";
import ModalProvider from "./Modal";

function UserView({
   username,
   avatar,
   subcribersCount,
   totalVideos,
   isSubscribed,
   userId,
}) {
   const params = useParams();
   const { userSubscribe, loadingSubscribe } = useSubscribe();

   function handleSubscribe() {
      userSubscribe(params?.userId);
   }
   return (
      <div className="w-[80vw] grid grid-cols-[auto_1fr] items-center gap-3 relative">
         <img
            className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] rounded-[100%]"
            src={avatar}
            alt=""
         />
         <div className="grid grid-rows-[auto_auto] gap-3">
            <div className="flex flex-col">
               <h1 className="text-xl md:text-3xl font-bold">{username}</h1>
               <span className="text-zinc-400 text-sm md:text-md">
                  subscribers {subcribersCount}
               </span>
               <span className="text-zinc-400 text-sm md:text-md">
                  video {totalVideos}{" "}
               </span>
            </div>
            <Button
               disabled={loadingSubscribe}
               onClick={handleSubscribe}
               extrastyles="rounded-md"
               type="primary"
            >
               {isSubscribed ? "Subscribed" : "Suscribe"}
            </Button>
         </div>

         <>
            {params?.userId === userId && (
               <ModalProvider>
                  <ModalProvider.ModalOpen opens="upload">
                     <Button>
                        <AiOutlineUpload
                           size={20}
                           fill="#212121"
                           className="absolute right-0 bottom-0 w-[25px] h-[25px] bg-lime-600 rounded-[100%] p-1 hover:bg-lime-800 transition-all duration-200"
                        />
                     </Button>
                  </ModalProvider.ModalOpen>
                  <ModalProvider.ModalWindow
                     window="upload"
                     clickOutside={false}
                  >
                     <InputFile />
                  </ModalProvider.ModalWindow>
               </ModalProvider>
            )}
         </>
      </div>
   );
}

export default UserView;
