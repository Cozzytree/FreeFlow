import { useParams } from "react-router";
import { useSubscribe } from "../Hooks/subscribeHooks/useSubscribeHooks";
import { AiOutlineUpload } from "react-icons/ai";
import Button from "./Button";
import InputFile from "./InputFile";
import ModalProvider from "./Modal";
import Header from "./Header";
import { MdArrowDownward } from "react-icons/md";

function UserView({
   username,
   avatar,
   subcribersCount,
   totalVideos,
   isSubscribed,
   userId,
   bio,
}) {
   const params = useParams();
   const { userSubscribe, loadingSubscribe } = useSubscribe();

   function handleSubscribe() {
      userSubscribe(params?.userId);
   }
   return (
      <div className="w-[80vw] grid grid-cols-[auto_1fr] items-center gap-3 relative">
         <img
            className="w-[80px] md:w-[150px] h-[80px] md:h-[150px] rounded-[100%] object-cover"
            src={avatar}
            alt=""
         />

         <div className="grid grid-rows-[1fr_0.5fr_0.5fr_0.5fr] gap-3">
            <h1 className="text-xl md:text-2xl font-bold">{username}</h1>

            <div className="flex flex-col">
               <p>
                  <span className="text-zinc-400 text-sm md:text-md">
                     {subcribersCount} subscribers - {totalVideos} videos
                  </span>
                  <span className="text-zinc-400 text-sm md:text-md"></span>
               </p>
            </div>

            {/* {bio &&  bio?.text} */}
            <ModalProvider>
               <ModalProvider.ModalOpen opens="about">
                  <button className="w-[50px] flex font-normal text-sm text-zinc-300 items-center">
                     About <MdArrowDownward />
                  </button>
               </ModalProvider.ModalOpen>
               <ModalProvider.ModalWindow window="about">
                  <div className="text-zinc-100">
                     <Header>About</Header>
                     <p>{bio?.text}</p>
                     <ul>
                        <Header>Socials</Header>
                        {bio?.links?.map((link) => (
                           <li key={link?._id}>
                              <span className="text-zinc-200 text-sm">
                                 {link.name}{" "}
                                 <a
                                    href={link?.url}
                                    target="_blank"
                                    rel="noreferrer"
                                 >
                                    {link?.url}
                                 </a>
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </ModalProvider.ModalWindow>
            </ModalProvider>

            <Button
               disabled={loadingSubscribe}
               onClick={handleSubscribe}
               extrastyles="rounded-sm text-xs uppercase"
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
