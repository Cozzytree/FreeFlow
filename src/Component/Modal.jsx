import React, {
   cloneElement,
   createContext,
   useContext,
   useRef,
   useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../Hooks/uiHooks/useClickOutside";
import { useEscapeClose } from "../Hooks/uiHooks/useEscapeClose";
import { AiOutlineClose } from "react-icons/ai";

const ModalContext = createContext();

function ModalProvider({ children }) {
   const [isModal, setModal] = useState("");
   const close = () => {
      setModal("");
   };
   const open = (open) => {
      setModal(open);
   };

   return (
      <ModalContext.Provider value={{ close, open, isModal }}>
         {children}
      </ModalContext.Provider>
   );
}

function ModalOpen({ children, opens }) {
   const { open } = useContext(ModalContext);
   if (React.isValidElement(children)) {
      return cloneElement(children, {
         onClick: () => open(opens),
         open: () => open(opens),
      });
   }
}

function ModalWindow({ children, window, clickOutside = true, escape = true }) {
   const { close, isModal } = useContext(ModalContext);
   const ref = useRef();

   useEscapeClose(close, escape);
   useClickOutside(ref, close, clickOutside);

   if (isModal !== window) return;

   return createPortal(
      <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center backdrop-brightness-[0.4] z-20">
         <div
            ref={ref}
            className={`modal max-w-[80vw] md:min-w-[40vw] p-6 rounded-md h-auto flex flex-col justify-center items-center relative bg-zinc-900 font-MPLUS`}
         >
            {children}

            <AiOutlineClose
               fill="white"
               size={25}
               onClick={close}
               cursor="pointer"
               className="absolute right-0 top-0 p-1"
            />
         </div>
      </div>,
      document.body
   );
}

ModalProvider.ModalOpen = ModalOpen;
ModalProvider.ModalWindow = ModalWindow;
export default ModalProvider;
