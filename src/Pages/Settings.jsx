import { useNavigate } from "react-router";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import Button from "../Component/Button";
import { FaEdit } from "react-icons/fa";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import ModalProvider from "../Component/Modal";
import FormInput from "../Component/FormInput";
import { useForm } from "react-hook-form";

function Settings() {
   const navigate = useNavigate();
   const { handleSubmit, register } = useForm();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   useDocumentTitle("Settings");

   if (!currentUser && !loadingCurrentUser) navigate("/");

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className="w-[100%] px-8 flex flex-col gap-4 items-center py-10">
         <Convenience field="Username" name={currentUser?.data?.username} />
         <Convenience field="Fullname" name={currentUser?.data?.fullname} />
         <Convenience field="Email" name={currentUser?.data?.email} />

         <ModalProvider>
            <ModalProvider.ModalOpen opens="form">
               <FaEdit />
            </ModalProvider.ModalOpen>
            <ModalProvider.ModalWindow window="form">
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
               >
                  <h1 className="text-2xl text-zinc-50 border-b mb-3">
                     Personal Details
                  </h1>
                  <FormInput
                     id="uaername"
                     required={true}
                     register={register}
                     placeholder="username"
                     defaultValue={currentUser?.data?.username}
                  />
                  <FormInput
                     id="fullname"
                     required={true}
                     register={register}
                     placeholder="fullname"
                     defaultValue={currentUser?.data?.fullname}
                  />
                  <FormInput
                     id="email"
                     required={true}
                     register={register}
                     placeholder="email"
                     defaultValue={currentUser?.data?.email}
                  />
                  <Button extrastyles="rounded-md" type="primary">
                     Save
                  </Button>
               </form>
            </ModalProvider.ModalWindow>
         </ModalProvider>
         <Button type="primary" extrastyles="h-[25px] rounded-[5%]">
            change password
         </Button>
      </div>
   );
}

function Convenience({ field, name }) {
   return (
      <p className="grid grid-cols-[1fr_auto] gap-4 w-[200px]">
         <span className="text-zinc-400 text-xs">{field}</span>
         <span className="text-sm w-[120px]">: {name}</span>
      </p>
   );
}

export default Settings;
