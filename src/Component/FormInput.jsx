function FormInput({
   type,
   placeholder,
   defaultValue,
   register,
   required,
   id,
}) {
   return (
      <input
         id={id}
         className="bg-transparent w-full text-zinc-100 text-md p-1 outline-none border-[1px] border-zinc-400/50 text-wrap"
         type={type}
         placeholder={placeholder}
         defaultValue={defaultValue}
         {...register(id, { required: required })}
      />
   );
}

export default FormInput;
