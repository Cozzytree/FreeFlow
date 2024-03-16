function OptionsTag({ value }) {
   const label = value
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

   return (
      <option
         className="bg-zinc-900 text-zinc-100 border-b-2"
         value={value}
         id={value}
      >
         {label}
      </option>
   );
}

export default OptionsTag;
