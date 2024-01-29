import { useForm } from "react-hook-form";
import Button from "../Component/Button";
import Items from "../Component/Items";
import Loader from "../Component/loader";
import { useAddTweet } from "../Hooks/tweetsHooks/useAddTweet";
import { useGetTweet } from "../Hooks/tweetsHooks/useGetTweets";

function Tweet() {
   const { register, handleSubmit, reset } = useForm();
   const { loadingTweets, allTweets } = useGetTweet();
   const { useraddTweet, loadingaddTweet } = useAddTweet();

   function onSubmit(data) {
      useraddTweet(data);
      reset();
   }

   return (
      <>
         {(loadingTweets || loadingaddTweet) && <Loader />}

         <form
            action=""
            className="flex gap-2 mb-4"
            onSubmit={handleSubmit(onSubmit)}
         >
            <textarea
               className="bg-transparent border-[0.8px] border-zinc-600/50 rounded-md p-3 outline-none text-xs md:text-xl font-thin tracking-wide w-[150px] md:w-[250px]"
               name="content"
               id="content"
               cols="50"
               rows="1"
               placeholder="write something..."
               {...register("content", { required: true })}
            ></textarea>
            <Button extrastyles="rounded-md" type="primary">
               Tweet
            </Button>
         </form>

         {allTweets?.data?.map((tweet) => (
            <Items key={tweet?._id} tweet={tweet} />
         ))}
      </>
   );
}

export default Tweet;
