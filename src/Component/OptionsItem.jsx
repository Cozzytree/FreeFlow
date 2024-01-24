function OptionsItem({ children }) {
     return (
          <li className="cursor-pointer hover:bg-zinc-600 hover:text-zinc-200">
               {children}
          </li>
     );
}

export default OptionsItem;
