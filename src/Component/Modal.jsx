import {
     cloneElement,
     createContext,
     useContext,
     useRef,
     useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../Hooks/uiHooks/useClickOutside";
import { useEscapeClose } from "../Hooks/uiHooks/useEscapeClose";

const ModalContext = createContext();

function ModalProvider({ children }) {
     const [isModal, setModal] = useState("");
     const close = () => setModal("");
     const open = (open) => setModal(open);
     return (
          <ModalContext.Provider value={{ close, open, isModal }}>
               {children}
          </ModalContext.Provider>
     );
}

function ModalOpen({ children, opens }) {
     const { open } = useContext(ModalContext);
     return cloneElement(children, { onClick: () => open(opens) });
}

function ModalWindow({ children, window }) {
     const { close, isModal } = useContext(ModalContext);
     const ref = useRef();

     useEscapeClose(close);
     useClickOutside(ref, close);

     if (isModal !== window) return;

     return createPortal(
          <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center backdrop-brightness-[0.4]">
               <div
                    ref={ref}
                    className="w-[25%] p-6 rounded-md border-[0.5px] border-zinc-500/30 h-fit flex flex-col justify-center items-center relative bg-zinc-800"
               >
                    {children}
               </div>
          </div>,
          document.body
     );
}

ModalProvider.ModalOpen = ModalOpen;
ModalProvider.ModalWindow = ModalWindow;
export default ModalProvider;
