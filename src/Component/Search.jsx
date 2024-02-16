import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import { useSearchVideo } from "../Hooks/videoHooks/useSearchVideo";
import { useState } from "react";

function Search() {
   const { search, searchResults } = useSearchVideo();
   const [searchInput, setSearch] = useState();

   const handleSearch = () => {
      if (!searchInput) return;
      search(searchInput);
   };
   return (
      <div className="border-[1px] border-zinc-600 rounded-md grid grid-cols-[1fr_auto] items-center mt-2 w-[80%] h-10 overflow-hidden mb-4">
         <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none px-2"
            type="text"
            placeholder="search videos..."
         />
         <Button extrastyles="px-4" type="primary" onClick={handleSearch}>
            <FaSearch cursor="pointer" />
         </Button>
      </div>
   );
}

export default Search;
