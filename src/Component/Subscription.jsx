import { useNavigate } from "react-router";
import { useSubscription } from "../Hooks/subscribeHooks/useSubscription";
import MiniSpinner from "./MiniSpinner";

function Subscription({ setIsNav }) {
   const navigate = useNavigate();
   const { isLoading, subbedTo } = useSubscription();
   return (
      <ul className="flex justify-center flex-col items-center p-2 border-[1px] border-zinc-500/50 bg-zinc-900/20 rounded-sm">
         {isLoading && <MiniSpinner />}
         {!isLoading &&
            subbedTo?.data?.map((subs) => (
               <li
                  onClick={() => {
                     navigate(`/u/${subs?._id}/videos`);
                     setIsNav(false);
                  }}
                  key={subs?._id}
                  className="w-[100%] gap-2 cursor-pointer mb-2 bg-zinc-700 p-1 grid grid-cols-[auto_1fr] items-center p-1"
               >
                  <img
                     src={subs?.avatar}
                     alt="avatar"
                     className="w-[25px] h-[25px] object-cover rounded-[100%]"
                  />
                  <h3 className="text-xs">{subs?.username}</h3>
               </li>
            ))}
      </ul>
   );
}

export default Subscription;
