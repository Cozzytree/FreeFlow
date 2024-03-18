import Button from "../Component/Button";
import ModalProvider from "../Component/Modal";
import FormInput from "../Component/FormInput";
import Header from "../Component/Header";
import Loader from "../Component/loader";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { useForm } from "react-hook-form";
import { useGetActiveUser } from "../Hooks/authHooks/useGetActiveUser";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";

function Settings() {
   const navigate = useNavigate();
   const { handleSubmit, register } = useForm();
   const { userData, isLoading } = useGetActiveUser();
   useDocumentTitle("Settings");

   useEffect(() => {
      if (!userData && !isLoading) {
         navigate("/");
      }
   }, [userData, isLoading, navigate]);

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className="w-full px-8 flex flex-col gap-4 items-center py-10">
         {isLoading && <Loader />}
         <div className="grid grid-cols-[1fr_auto] items-end gap-2">
            <img
               loading="lazy"
               src={userData?.data?.avatar}
               alt="avatar"
               className="object-contain rounded-[100%]"
               width="150px"
            />
            <label htmlFor="avatar" className="cursor-pointer text-xs ">
               <MdEdit size={10} />
            </label>
         </div>
         <input className="hidden" type="file" name="" id="avatar" />

         <Convenience field="Username" name={userData?.data?.username} />
         <Convenience field="Fullname" name={userData?.data?.fullName} />
         <Convenience field="Email" name={userData?.data?.email} />

         <ModalProvider>
            <ModalProvider.ModalOpen opens="form">
               <FaEdit cursor="pointer" />
            </ModalProvider.ModalOpen>
            <ModalProvider.ModalWindow window="form">
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 px-8"
               >
                  <Header> Personal Details</Header>

                  <FormInput
                     id="uaername"
                     required={true}
                     register={register}
                     placeholder="username"
                     defaultValue={userData?.data?.username}
                  />
                  <FormInput
                     id="fullname"
                     required={true}
                     register={register}
                     placeholder="fullname"
                     defaultValue={userData?.data?.fullName}
                  />
                  <FormInput
                     id="email"
                     required={true}
                     register={register}
                     placeholder="email"
                     defaultValue={userData?.data?.email}
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
      <p className="grid grid-cols-[0.5fr_1fr] gap-4 w-[300px]">
         <span className="text-zinc-400 text-xs">{field}</span>
         <span className="text-sm">: {name}</span>
      </p>
   );
}

export default Settings;
