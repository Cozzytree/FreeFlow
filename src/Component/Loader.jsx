import { createPortal } from "react-dom";

function Loader() {
   return createPortal(
      <div className="fixed top-0 left-0 animate-pulse pt-8 pb-8 pl-[100px] gap-3 inset-0 w-full h-full z-[999] bg-zinc-700/50"></div>,
      document.body
   );
}

export default Loader;
