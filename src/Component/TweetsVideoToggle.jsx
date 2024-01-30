import { useParams } from "react-router";
import Link from "./Link";
import { useEffect, useState } from "react";

function TweetsVideoToggle() {
   const [isVideo, setVideo] = useState("videos");
   const params = useParams();

   useEffect(() => {
      const url = document.URL.split("/");
      setVideo(url[url.length - 1]);
   }, []);

   return (
      <nav className="w-[100%] px-8 pt-5 border-b-[0.5px] border-zinc-700">
         <ul className="style-none flex gap-10 ">
            <Link
               active={isVideo === "videos"}
               to={`/u/${params?.userId}/videos`}
            >
               Videos
            </Link>
            <Link
               active={isVideo === "tweets"}
               to={`/u/${params?.userId}/tweets`}
            >
               Tweets
            </Link>
         </ul>
      </nav>
   );
}

export default TweetsVideoToggle;
