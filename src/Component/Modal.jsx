import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const ModalContext = createContext();

function ModalProvider({ children }) {
     const [isModal, setModal] = useState(false);
     const close = () => setModal(false);
     const open = () => setModal(true);
     return (
          <ModalContext.Provider value={{ close, open, isModal }}>
               {children}
          </ModalContext.Provider>
     );
}

function ModalOpen({ children }) {
     const { open } = useContext(ModalContext);
     return cloneElement(children, { onClick: () => open() });
}

function ModalWindow({ children }) {
     const { close, isModal } = useContext(ModalContext);
     if (!isModal) return;

     return createPortal(
          <div className="fixed inset-0 w-full h-full flex justify-center items-center">
               <div>{children}</div>
               <Button onClick={close} type="danger">
                    X
               </Button>
          </div>,
          document.body
     );
}

ModalProvider.ModalOpen = ModalOpen;
ModalProvider.ModalWindow = ModalWindow;
export default ModalProvider;
