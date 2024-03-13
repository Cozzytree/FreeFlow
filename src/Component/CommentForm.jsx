import { useForm } from "react-hook-form";
import Button from "./Button";
import FormInput from "./FormInput";

function CommentForm({ isLoading, handler }) {
   const { register, handleSubmit } = useForm();
   function onSubmit(data) {
      handler(data);
   }
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-[80%] flex relative py-2"
      >
         <FormInput
            type="text"
            placeholder="comment..."
            id="content"
            register={register}
            required={true}
         />

         <Button
            disabled={isLoading}
            extrastyles="rounded-md h-[40px] text-xs"
            type="primary"
         >
            Add comment
         </Button>
      </form>
   );
}

export default CommentForm;
