function FormTextArea({ id, register, placeholder, required, defaultValue }) {
   return (
      <textarea
         className="w-[150px] sm:w-[200px] md:w-[300px] bg-transparent font-medium text-zinc-100 text-xs sm:text-md p-2 outline-none border-[1px] border-zinc-400/50 md:text-md rounded-sm"
         id={id}
         placeholder={placeholder}
         defaultValue={defaultValue}
         {...register(id, { required: required })}
      ></textarea>
   );
}

export default FormTextArea;
