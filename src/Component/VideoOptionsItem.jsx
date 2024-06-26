function VideoOptionsItem({ label, icon, onClick }) {
   return (
      <li
         onClick={onClick}
         className="text-xs grid grid-cols-[auto_1fr] items-center gap-2 border-b-[1px] border-transparent hover:border-b-zinc-300 transition-[border] duration-300 cursor-pointer p-[2px] relative"
      >
         <span className="w-full">{icon && icon}</span>
         <span className="text-xs left-0">{label}</span>
      </li>
   );
}

export default VideoOptionsItem;
