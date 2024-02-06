import { useNavigate } from "react-router";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import Button from "../Component/Button";
import { FaEdit } from "react-icons/fa";

function Settings() {
   const navigate = useNavigate();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   if (!currentUser && !loadingCurrentUser) navigate("/");

   return (
      <div className="w-[100%] px-8 flex flex-col gap-4 items-center py-10">
         <Convenience field="Username" name={currentUser?.data?.username} />
         <Convenience field="Fullname" name={currentUser?.data?.fullName} />
         <Convenience field="Email" name={currentUser?.data?.email} />
         <span className="text-zinc-400 underline cursor-pointer flex gap-2 items-center">
            update <FaEdit />
         </span>
         <Button type="primary" extrastyles="h-[25px] rounded-[5%]">
            change password
         </Button>
      </div>
   );
}

function Convenience({ field, name }) {
   return (
      <p className="grid grid-cols-[1fr_auto] gap-4 w-[200px]">
         <span className="text-zinc-400 text-xs">{field} :</span>{" "}
         <span className="text-sm w-[120px]">{name}</span>
      </p>
   );
}

export default Settings;
