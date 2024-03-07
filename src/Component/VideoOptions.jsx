import { useRef } from "react";
import { useClickOutside } from "../Hooks/uiHooks/useClickOutside";
import { useEscapeClose } from "../Hooks/uiHooks/useEscapeClose";

function VideoOptions({ children, setIsOptions, outsideClose = true }) {
   const ref = useRef();
   useClickOutside(ref, () => setIsOptions(null), outsideClose);
   useEscapeClose(() => setIsOptions(null), true);

   return (
      <ul
         ref={ref}
         className={`absolute w-[150px] flex flex-col gap-3 bg-zinc-900 rounded-md p-2 animate-slow transition-all duration-300 z-10 right-[5%] top-[5%]`}
      >
         {children}
      </ul>
   );
}

export default VideoOptions;
