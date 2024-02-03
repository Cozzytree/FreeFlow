function OptionsItem({ children }) {
    return (
        <li className="cursor-pointer flex gap-4 items-center text-zinc-100 p-[5px] border-b-[0.5px] border-b-zinc-600 w-[100%] text-center justify-center list-none">
            {children}
        </li>
    );
}

export default OptionsItem;
