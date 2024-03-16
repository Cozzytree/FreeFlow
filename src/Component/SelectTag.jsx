import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SelectTag({ children, label }) {
   const [value, setValue] = useState("");
   const [searchParams, setSearchParams] = useSearchParams();
   const handleValue = (e) => {
      setValue(e.target.value);
   };

   useEffect(() => {
      if (!value) return;
      searchParams.set(label, value);
      setSearchParams(searchParams);
   }, [value, searchParams, setSearchParams, label]);

   return (
      <div className="grid grid-cols-[auto_1fr] gap-2 p-1">
         <label className="border-b-[1px] w-[100px] px-1 border-zinc-500 font-bold">
            {label}
         </label>
         <select
            onChange={handleValue}
            className="bg-transparent outline-none border-[1px] border-zinc-500 p-1 rounded-md"
            value={value}
         >
            {children}
         </select>
      </div>
   );
}

export default SelectTag;
