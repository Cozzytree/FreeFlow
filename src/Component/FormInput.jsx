function FormInput({
   type,
   placeholder,
   defaultValue,
   register,
   required,
   id,
   inpurRef,
}) {
   return (
      <input
         ref={inpurRef}
         id={id}
         className="w-[150px] sm:w-[200px] md:w-[300px] bg-transparent font-medium text-zinc-100 text-xs sm:text-md p-2 outline-none border-[1px] border-zinc-400/50 md:text-md rounded-sm"
         type={type}
         placeholder={placeholder}
         defaultValue={defaultValue}
         {...register(id, { required: required })}
      />
   );
}

export default FormInput;
