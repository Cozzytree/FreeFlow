import { HiOutlineDotsVertical } from "react-icons/hi";
import OptionsItem from "./OptionsItem";
import ModalProvider from "./Modal";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import Button from "./Button";

function Options({ handleOptions, userId, deleteHandler, currentItem }) {
   const { currentUser } = useCurrentUser();
   return (
      <div className="absolute right-2 top-1 flex flex-col justify-end items-end text-sm rotate-90">
         <ModalProvider>
            <ModalProvider.ModalOpen opens="options">
               <HiOutlineDotsVertical
                  className="cursor-pointer"
                  onClick={handleOptions}
               />
            </ModalProvider.ModalOpen>
            <ModalProvider.ModalWindow window="options">
               <OptionsItem>Share</OptionsItem>
               {currentUser?.data?._id === userId && (
                  <OptionsItem>
                     <Button
                        onClick={() => {
                           deleteHandler(currentItem);
                        }}
                        type="danger"
                     >
                        Delete
                     </Button>
                  </OptionsItem>
               )}
            </ModalProvider.ModalWindow>
         </ModalProvider>
      </div>
   );
}

export default Options;
