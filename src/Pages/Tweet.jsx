import { useForm } from "react-hook-form";
import Button from "../Component/Button";
import Items from "../Component/Items";
import Loader from "../Component/loader";
import { useAddTweet } from "../Hooks/tweetsHooks/useAddTweet";
import { useGetTweet } from "../Hooks/tweetsHooks/useGetTweets";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import FormTextArea from "../Component/FormTextArea";
import { useState } from "react";
import VideoOptionsItem from "../Component/VideoOptionsItem";

function Tweet() {
   const [option, setOptions] = useState(null);
   const { register, handleSubmit, reset } = useForm();
   const { loadingTweets, allTweets } = useGetTweet();
   const { useraddTweet, loadingaddTweet } = useAddTweet();
   useDocumentTitle("Tweets");

   function handleOptions(index) {
      setOptions((option) => (option === index ? null : index));
   }

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
            <FormTextArea
               required={true}
               id="content"
               placeholder="Write Something..."
               register={register}
               type="text"
            />
            <Button
               ariaLabel="like button"
               extrastyles="rounded-md h-[30px]"
               type="primary"
            >
               Tweet
            </Button>
         </form>

         {allTweets?.data?.map((tweet, index) => (
            <Items
               key={tweet?._id}
               tweet={tweet}
               index={index}
               handleOptions={handleOptions}
               isOptions={option}
               setOption={setOptions}
               options={
                  <>
                     <VideoOptionsItem label="Share" />
                     <VideoOptionsItem label="Report" />
                  </>
               }
            />
         ))}
      </>
   );
}

export default Tweet;
