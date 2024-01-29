import { useParams } from "react-router";
import { useSubscribe } from "../Hooks/subscribeHooks/useSubscribeHooks";
import Button from "./Button";

function UserView({
   username,
   avatar,
   subcribersCount,
   totalVideos,
   isSubscribed,
}) {
   const params = useParams();
   const { userSubscribe } = useSubscribe();

   function handleSubscribe() {
      userSubscribe(params?.userId);
   }
   return (
      <div className="w-[80vw] grid grid-cols-[auto_1fr] items-center gap-3">
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
               onClick={handleSubscribe}
               extrastyles="rounded-md"
               type="primary"
            >
               {isSubscribed ? "Subscribed" : "Suscribe"}
            </Button>
         </div>
      </div>
   );
}

export default UserView;
