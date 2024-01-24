import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Options({ children }) {
     const [isOptions, setOptions] = useState();
     return (
          <div className="absolute right-2 top-1 flex flex-col justify-end items-end text-sm gap-2">
               <HiOutlineDotsVertical
                    className="cursor-pointer"
                    onClick={() => {
                         setOptions((option) => !option);
                    }}
               />
               {isOptions && <ul className="list-none">{children}</ul>}
          </div>
     );
}

export default Options;
