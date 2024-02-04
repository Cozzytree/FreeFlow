function OptionsItem({ children }) {
   return (
      <li className="cursor-pointer flex justify-center gap-4 items-center text-zinc-100 py-2 px-1 border-b-[0.5px] border-b-zinc-600 min-w-[120px] text-center list-none">
         {children}
      </li>
   );
}

export default OptionsItem;
