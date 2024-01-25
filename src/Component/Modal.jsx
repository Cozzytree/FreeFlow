import {
     cloneElement,
     createContext,
     useContext,
     useEffect,
     useRef,
     useState,
} from "react";
import { createPortal } from "react-dom";

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

     useEffect(() => {
          function cModal(e) {
               if (e.code == "Escape") {
                    close();
               }
          }

          document.addEventListener("keydown", cModal);
          return () => document.removeEventListener("keydown", cModal);
     }, [ref, close]);

     useEffect(() => {
          function handleOutsideClick(e) {
               const isSVG =
                    e.target instanceof SVGElement ||
                    e.target.tagName.toLowerCase() === "svg";
               if (ref.current && !ref.current.contains(e.target) && !isSVG) {
                    close();
               }
          }

          document.addEventListener("click", handleOutsideClick, false);

          return () => {
               document.removeEventListener("click", handleOutsideClick, false);
          };
     }, [close]);
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
