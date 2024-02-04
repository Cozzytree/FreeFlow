function Input({ setState, defaultValue, placeholder }) {
   return (
      <input
         onChange={(e) => setState(e.target.value)}
         className="bg-transparent outline-none border-[0.5px] border-zinc-400 rounded-md p-2 text-zinc-100"
         type="text"
         placeholder={placeholder}
         defaultValue={defaultValue || null}
         autoFocus
      />
   );
}

export default Input;
