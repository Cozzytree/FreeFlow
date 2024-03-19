import Button from "../Component/Button";
import Items from "../Component/Items";
import Loader from "../Component/loader";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import FormTextArea from "../Component/FormTextArea";
import { useForm } from "react-hook-form";
import { useAddTweet } from "../Hooks/tweetsHooks/useAddTweet";
import { useGetTweet } from "../Hooks/tweetsHooks/useGetTweets";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { useEffect, useRef, useState } from "react";
import MiniSpinner from "../Component/MiniSpinner";

function Tweet() {
   const [option, setOptions] = useState(null);
   const { register, handleSubmit, reset } = useForm();
   const tweetRef = useRef(null);
   const {
      loadingTweets,
      allTweets,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
   } = useGetTweet();
   const { useraddTweet, loadingaddTweet } = useAddTweet();

   useDocumentTitle("Tweets");

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (
                  entry.isIntersecting &&
                  entry.target === tweetRef?.current?.lastElementChild
               ) {
                  if (hasNextPage) fetchNextPage();
               }
            });
         },
         {
            root: null,
            threshold: [0.5],
         }
      );
      const tweets = tweetRef?.current?.children;

      for (const tweet of tweets) {
         observer.observe(tweet);
      }

      return () => observer.disconnect();
   }, [fetchNextPage, hasNextPage]);

   function handleOptions(index) {
      setOptions((option) => (option === index ? null : index));
   }

   function onSubmit(data) {
      useraddTweet(data);
      reset();
   }

   const tweets = allTweets?.reduce((acc, current) => {
      const pageData = current?.data?.data[0];
      const concatenatedPaginated = [...acc, ...pageData.paginated];
      return concatenatedPaginated;
   }, []);
   // ("#00505ef");
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

         <div ref={tweetRef} className="tweet h-full">
            {tweets?.map((tweet, index) => (
               <Items
                  key={tweet?._id}
                  tweet={tweet}
                  index={index}
                  handleOptions={handleOptions}
                  isOptions={option}
                  setOption={setOptions}
                  options={
                     <>
                        <VideoOptionsItem label="Report" />
                     </>
                  }
               />
            ))}

            {isFetchingNextPage && <MiniSpinner />}
         </div>
      </>
   );
}

export default Tweet;
