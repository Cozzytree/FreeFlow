import Link from "./Link";

function TweetsVideoToggle({ params, pathName }) {
   // console.log(pathName);
   return (
      <nav className="w-[100%] px-8 pt-5 border-b-[0.5px] border-zinc-700">
         <ul className="style-none flex gap-10 justify-center">
            <Link
               active={pathName === "videos"}
               to={`/u/${params?.userId}/videos`}
            >
               Videos
            </Link>
            <Link
               active={pathName === "tweets"}
               to={`/u/${params?.userId}/tweets`}
            >
               Tweets
            </Link>
            <Link
               active={pathName === "playlists"}
               to={`/u/${params?.userId}/playlists`}
            >
               Playlists
            </Link>
         </ul>
      </nav>
   );
}

export default TweetsVideoToggle;
