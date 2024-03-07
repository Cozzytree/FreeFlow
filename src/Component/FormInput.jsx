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
         className="bg-transparent text-zinc-100 text-md p-1 outline-none border-[1px] border-zinc-400/50 w-[250px] text-wrap"
         type={type}
         placeholder={placeholder}
         defaultValue={defaultValue}
         {...register(id, { required: required })}
      />
   );
}

export default FormInput;
