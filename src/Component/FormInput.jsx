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
         className="min-w-[200px] bg-transparent w-full text-zinc-100 text-md p-1 outline-none border-[1px] border-zinc-400/50 text-wrap text-sm md:text-md rounded-md "
         type={type}
         placeholder={placeholder}
         defaultValue={defaultValue}
         {...register(id, { required: required })}
      />
   );
}

export default FormInput;
