import { useForm } from "react-hook-form";
import Button from "./Button";
import FormInput from "./FormInput";

function CommentForm({ isLoading, handler }) {
   const { register, handleSubmit, reset } = useForm();
   function onSubmit(data) {
      handler(data, () => reset());
   }
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-[80%] flex py-2 sticky top-0"
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
