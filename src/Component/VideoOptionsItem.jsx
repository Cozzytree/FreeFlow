function VideoOptionsItem({ label, icon, onClick }) {
   return (
      <li
         onClick={onClick}
         className="text-xs text-pretty flex items-center gap-1 border-b-[1px] border-transparent hover:border-b-zinc-300 transition-[border] duration-300 cursor-pointer p-2 relative"
      >
         <span className="z-[1]">{icon && icon}</span>
         <span className="text-xs left-0">{label}</span>
      </li>
   );
}

export default VideoOptionsItem;
