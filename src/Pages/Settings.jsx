import Button from "../Component/Button";
import ModalProvider from "../Component/Modal";
import FormInput from "../Component/FormInput";
import Header from "../Component/Header";
import Loader from "../Component/loader";
import VideoOptions from "../Component/ItemOptions";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import AreYouSure from "../Component/AreYouSure";
import FormTextArea from "../Component/FormTextArea";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { useForm } from "react-hook-form";
import { useGetActiveUser } from "../Hooks/authHooks/useGetActiveUser";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useAddLink } from "../Hooks/authHooks/useAddLink";
import { useDelLink } from "../Hooks/authHooks/usedelLinkfromBio";
import { useUpdateBioText } from "../Hooks/authHooks/useUpdateBioText";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

function Settings() {
   const [isOptions, setOption] = useState(false);
   const navigate = useNavigate();
   const { handleSubmit, register, reset } = useForm();
   const { userData, isLoading } = useGetActiveUser();
   const { userAddLink, isAddingLink } = useAddLink();
   const { userDelLink, isDeleting } = useDelLink();
   const { userUpdateText, isUpdating } = useUpdateBioText();
   useDocumentTitle("Settings");
   useEffect(() => {
      if (!userData?.data?._id && !isLoading) {
         navigate("/");
      }
   }, [userData, isLoading, navigate]);

   const onSubmit = (data) => {
      console.log(data);
   };

   const handleOptions = (index) => {
      setOption((option) => (option === index ? false : index));
   };

   const handleAddLink = (data) => {
      userAddLink(data, {
         onSuccess: () => {
            setOption(false);
            reset();
         },
      });
   };

   const handleDelLink = (id) => {
      if (!id) return;
      userDelLink(id);
   };

   const handleUpdateBioText = (data) => {
      if (userData?.data?.bio?.text === data?.text) return;
      userUpdateText(data, { onSuccess: () => handleOptions(false) });
   };
   if (userData?.data?._id)
      return (
         <div className="w-full px-8 flex flex-col gap-4 items-center py-10">
            {isLoading && <Loader />}
            <div className="w-fit p-2 rounded-md flex items-end gap-2">
               <img
                  loading="lazy"
                  src={userData?.data?.avatar}
                  alt="avatar"
                  className="w-[100px] h-[100px] object-fill rounded-[100%]"
               />
               <label
                  htmlFor="avatar"
                  className="cursor-pointer text-xs flex items-center gap-1"
               >
                  <FaEdit size={10} /> change profile
               </label>
               <input className="hidden" type="file" name="" id="avatar" />
            </div>

            <div className="flex items-center gap-2">
               <Header>Personal Details</Header>
               <ModalProvider>
                  <ModalProvider.ModalOpen opens="form">
                     <button className="text-xs flex items-center gap-1">
                        <FaEdit cursor="pointer" /> edit
                     </button>
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
                        <Button
                           extrastyles="rounded-sm text-xs h-[25px]"
                           type="primary"
                        >
                           Save
                        </Button>
                     </form>
                  </ModalProvider.ModalWindow>
               </ModalProvider>
            </div>
            <Convenience field="Username" name={userData?.data?.username} />
            <Convenience field="Fullname" name={userData?.data?.fullName} />
            <Convenience field="Email" name={userData?.data?.email} />
            <div className="flex items-center">
               <Header>About</Header>
               <ModalProvider>
                  <ModalProvider.ModalOpen opens="addText">
                     <FaEdit cursor="pointer" size={10} />
                  </ModalProvider.ModalOpen>
                  <ModalProvider.ModalWindow window="addText">
                     <form
                        onSubmit={handleSubmit(handleUpdateBioText)}
                        className="modal flex gap-1"
                     >
                        <FormTextArea
                           type="text"
                           defaultValue={userData?.data?.bio?.text}
                           id="text"
                           register={register}
                           required={true}
                           placeholder="about..."
                        />
                        <Button
                           disabled={isUpdating}
                           type="primary"
                           extrastyles="h-[25px] rounded-sm text-sm"
                        >
                           Save
                        </Button>
                     </form>
                  </ModalProvider.ModalWindow>
               </ModalProvider>
            </div>
            <p className="flex items-center gap-1">
               {userData?.data?.bio?.text}
            </p>
            <Header>Links</Header>
            <ul className="flex flex-col items-center gap-2 text-sm">
               {userData?.data?.bio?.links.length === 0 ? (
                  <span className="text-xs text-zinc-300">empty</span>
               ) : (
                  userData?.data?.bio?.links?.map((link, index) => (
                     <li
                        key={link?._id}
                        className="w-full grid grid-cols-[1fr_auto_auto] gap-2 items-center relative"
                     >
                        <span className="text-sm text-zinc-300">
                           {link.name}
                        </span>
                        <a
                           className="underline appearance-none text-sky-300 w-[250px] px-1 overflow-x-auto"
                           href={link.url}
                        >
                           {link.url}
                        </a>
                        <HiOutlineDotsVertical
                           cursor="pointer"
                           onClick={() => handleOptions(index)}
                        />
                        {index === isOptions && (
                           <VideoOptions
                              setIsOptions={setOption}
                              outsideClose={true}
                           >
                              {/* {edit} */}
                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="editLinks">
                                    <VideoOptionsItem
                                       label="Edit"
                                       icon={<FaEdit />}
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="editLinks">
                                    <form className="modal flex flex-col gap-2 items-center justify-center">
                                       <Header>Link Details</Header>
                                       <FormInput
                                          type="text"
                                          defaultValue={link?.name}
                                          register={register}
                                          required={true}
                                          id="name"
                                       />
                                       <FormInput
                                          type="text"
                                          defaultValue={link?.url}
                                          register={register}
                                          required={true}
                                          id="url"
                                       />
                                       <Button
                                          extrastyles="text-sm rounded-dm h-[25px]"
                                          type="primary"
                                       >
                                          Save
                                       </Button>
                                    </form>
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>

                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="delLink">
                                    <VideoOptionsItem
                                       label="Delete"
                                       icon={<MdDelete />}
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="delLink">
                                    <AreYouSure
                                       label="Are you sure you want to delete?"
                                       hadler={() => handleDelLink(link?._id)}
                                       loader={isDeleting}
                                       confirm="DELETE"
                                    />
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>
                           </VideoOptions>
                        )}
                     </li>
                  ))
               )}
            </ul>
            <div>
               {/* {add link} */}
               <ModalProvider>
                  <ModalProvider.ModalOpen opens="addLinkForm">
                     <MdAdd
                        className="bg-zinc-600 p-1 rounded-full cursor-pointer"
                        size={30}
                     />
                  </ModalProvider.ModalOpen>
                  <ModalProvider.ModalWindow window="addLinkForm">
                     <form
                        onSubmit={handleSubmit(handleAddLink)}
                        className="modal flex flex-col gap-2 items-center justify-center"
                     >
                        <Header>Add Link</Header>
                        <FormInput
                           type="text"
                           id="name"
                           placeholder="Name"
                           register={register}
                           required={true}
                        />
                        <FormInput
                           type="text"
                           id="url"
                           placeholder="url"
                           register={register}
                           required={true}
                        />
                        <Button
                           disabled={isAddingLink}
                           extrastyles="text-sm rounded-dm h-[25px]"
                           type="primary"
                        >
                           Save
                        </Button>
                     </form>
                  </ModalProvider.ModalWindow>
               </ModalProvider>
            </div>
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
