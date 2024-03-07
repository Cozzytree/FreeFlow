function FormTextArea({ id, register, placeholder, required }) {
   return (
      <textarea
         className="bg-transparent outline-none w-[200px] md:w-[250px] max-h-[200px] text-zinc-100 border-[0.5px] rounded-md border-zinc-500 p-2"
         id={id}
         placeholder={placeholder}
         {...register(id, { required: required })}
      ></textarea>
   );
}

export default FormTextArea;
