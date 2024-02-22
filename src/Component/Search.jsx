import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import { useSearchVideo } from "../Hooks/videoHooks/useSearchVideo";
import { useCallback, useEffect, useRef, useState } from "react";
import MiniSpinner from "./MiniSpinner";

function debounce(fn, t) {
   let timer;
   return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), t);
   };
}

function Search() {
   const { search, searchResults, isPending } = useSearchVideo();

   const [searchInput, setSearch] = useState();
   const inputRef = useRef(null);

   const handleSearch = useCallback(() => {
      if (!searchInput) return;
      search(searchInput);
   }, [search, searchInput]);

   useEffect(() => {
      const find = debounce(handleSearch, 2000);
      if (searchInput?.length > 3) {
         find(search);
      }

      return () => clearTimeout(find);
   }, [searchInput, handleSearch, search]);

   return (
      <div
         className={`container mx-auto w-[100%] justify-center px-10 flex z-10 sticky top-0 bg-zinc-800`}
      >
         <div className="border-[1px] border-zinc-600 rounded-md grid grid-cols-[1fr_auto] mt-2 h-10 overflow-hidden mb-4 w-[80%]">
            <input
               ref={inputRef}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-transparent outline-none px-2"
               type="text"
               placeholder="search videos..."
            />
            <Button
               extrastyles="px-4 w-[40px]"
               type="primary"
               onClick={handleSearch}
            >
               <FaSearch cursor="pointer" />
            </Button>
         </div>
         {inputRef?.current?.value && (
            <ul className="w-[80%] min-h-[100px] max-h-[150px] overflow-y-auto z-10 bg-zinc-800 rounded-sm absolute top-[90%] flex flex-col items-center p-2">
               {isPending && <MiniSpinner />}
               {searchResults?.data?.length === 0 && "no results"}
               {searchResults?.data?.map((result) => (
                  <li
                     className="flex w-[80%] border-b-[1px] border-b-zinc-400/50 cursor-pointer items-center gap-3 m-3 p-[20px] h-[30px]"
                     key={result?._id}
                  >
                     <img
                        className="w-[30px]  h-[30px] rounded-[100%] object-fill"
                        src={result?.thumbnail}
                        alt="thumbnail"
                     />
                     <p>{result?.title}</p>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default Search;
