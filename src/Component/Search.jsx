import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";

function debounce(fn, t) {
   let timer;
   return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), t);
   };
}

function Search() {
   const navigate = useNavigate();
   const [searchInput, setSearch] = useState();
   const [focused, setFocused] = useState(false);
   const inputRef = useRef(null);

   const handleSearch = useCallback(() => {
      if (!searchInput) return;
      navigate(`/query/${searchInput}`);
      setSearch("");
   }, [searchInput, navigate]);

   return (
      <div
         className={`w-[100%] justify-center px-10 flex z-20 sticky top-0 bg-zinc-800/50`}
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
      </div>
   );
}

export default Search;
