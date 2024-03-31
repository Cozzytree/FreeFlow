import Button from "./Button";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

// function debounce(fn, t) {
//    let timer;
//    return function (...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => fn(...args), t);
//    };
// }

function Search() {
   const [isFocused, setFocused] = useState(false);
   const [search, setSearch] = useState("");
   const [searchHistory, setSearchHistory] = useState(
      JSON.parse(localStorage.getItem("search_History")) || []
   );
   const { currentUser } = useCurrentUser();
   const inputRef = useRef();
   const navigate = useNavigate();

   const handleSearch = (e) => {
      e.preventDefault();
      if (search.length <= 3) return;
      navigate(`/search?q=${encodeURIComponent(search)}`);
      let searchHistory =
         JSON.parse(localStorage.getItem("search_History")) || [];
      searchHistory.push(search);
      localStorage.setItem("search_History", JSON.stringify(searchHistory));
   };

   const handleUploadNav = () => {
      if (currentUser?.data?._id) {
         navigate("/upload_video");
      } else {
         navigate("/login");
      }
   };

   const handleBlur = () => {
      setFocused(false);
   };

   return (
      <div className="w-full flex justify-center bg-zinc-950 items-center gap-3 z-20 sticky top-0 bg-blac">
         <div className="relative h-full ">
            <form
               ref={inputRef}
               onSubmit={handleSearch}
               className="w-fit rounded-xl overflow-hidden grid grid-cols-[1fr_auto] mt-2 h-10 mb-4"
            >
               <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[150px] sm:w-[200px] md:w-[300px] bg-transparent font-medium text-zinc-100 text-xs sm:text-md p-2 outline-none border-[1px] border-zinc-400/50 md:text-md rounded-sm"
                  id="search"
                  type="text"
                  onBlur={handleBlur}
                  onFocus={() => setFocused(true)}
                  placeholder="search"
               />
               <Button
                  extrastyles="p-1 rounded-sm"
                  type="primary"
                  onClick={handleSearch}
               >
                  <FaSearch cursor="pointer" />
               </Button>
            </form>
            {isFocused && (
               <div className="w-full absolute top-[70%] rounded-md py-2 flex flex-col items-start px-4 bg-zinc-800">
                  {searchHistory?.map((s, i) => (
                     <p
                        className="border-b-[1px] cursor-pointer w-full border-b-zinc-600"
                        key={i}
                     >
                        {s}
                     </p>
                  ))}
               </div>
            )}
         </div>
         <AiOutlineVideoCameraAdd
            onClick={handleUploadNav}
            size={30}
            fill="black"
            className="bg-zinc-100 w-[20px] md:w-[25px] h-[20px] md:h-[25px] cursor-pointer rounded-[100%] p-1"
         />
      </div>
   );
}

export default Search;
