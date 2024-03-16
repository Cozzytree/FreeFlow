import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

// function debounce(fn, t) {
//    let timer;
//    return function (...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => fn(...args), t);
//    };
// }

function Search() {
   const inputRef = useRef();
   const navigate = useNavigate();
   const { handleSubmit, register } = useForm();
   const [searchParams, setSearchParams] = useSearchParams();

   const handleSearch = (data) => {
      if (!data?.search) return;
      navigate(`/search`);
      searchParams.set("q", data.search);
      setSearchParams(searchParams);
      localStorage.setItem("search_History", data?.search);
   };

   return (
      <div
         className={`w-[100%] justify-center px-10 flex z-20 sticky top-0 bg-black`}
      >
         <form
            ref={inputRef}
            onSubmit={handleSubmit(handleSearch)}
            className="border-[1px] border-zinc-600 rounded-md grid grid-cols-[1fr_auto] mt-2 h-10 overflow-hidden mb-4 w-[80%]"
         >
            <input
               // ref={inputRef}
               type="text"
               id="search"
               placeholder="search videos..."
               className="bg-transparent w-full text-zinc-100 text-md p-1 outline-none border-[1px] border-zinc-400/50 text-wrap"
               {...register("search", { required: true })}
            />

            <Button
               extrastyles="px-4 w-[40px]"
               type="primary"
               onClick={handleSearch}
            >
               <FaSearch cursor="pointer" />
            </Button>
         </form>
      </div>
   );
}

export default Search;
