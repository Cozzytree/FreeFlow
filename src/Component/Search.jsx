import Button from "./Button";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import FormInput from "./FormInput";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

// function debounce(fn, t) {
//    let timer;
//    return function (...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => fn(...args), t);
//    };
// }

function Search() {
   const { currentUser } = useCurrentUser();
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

   const handleUploadNav = () => {
      if (currentUser?.data?._id) {
         navigate("/upload_video");
      } else {
         navigate("/login");
      }
   };

   return (
      <div className="w-full flex justify-center bg-zinc-950 items-center gap-3 z-20 sticky top-0 bg-blac">
         <form
            ref={inputRef}
            onSubmit={handleSubmit(handleSearch)}
            className="w-fit rounded-xl overflow-hidden grid grid-cols-[1fr_auto] mt-2 h-10 mb-4"
         >
            <FormInput
               placeholder="search"
               id="search"
               register={register}
               type="text"
               required={true}
            />

            <Button
               extrastyles="p-1 rounded-sm"
               type="primary"
               onClick={handleSearch}
            >
               <FaSearch cursor="pointer" />
            </Button>
         </form>

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
