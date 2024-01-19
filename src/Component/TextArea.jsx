function TextArea({ name, placeholder }) {
  return (
    <textarea
      className="bg-transparent border-[0.8px] border-zinc-600/50 rounded-md p-3 outline-none text-xs md:text-xl font-thin tracking-wide w-[150px] md:w-[250px]"
      name={name}
      id=""
      cols="50"
      rows="1"
      placeholder={placeholder}
    ></textarea>
  );
}

export default TextArea;
