function VideoOptionsItem({ label, icon, onClick }) {
   return (
      <li
         onClick={onClick}
         className="text-xs text-pretty items-center grid grid-cols-[1fr_auto] gap-1 border-b-[1px] border-transparent hover:border-b-zinc-300 transition-[border] duration-300 cursor-pointer p-1 relative"
      >
         <span className="w-[100%] z-[1]">{icon && icon}</span>
         <span className="absolute text-sm left-1">{label}</span>
      </li>
   );
}

export default VideoOptionsItem;
