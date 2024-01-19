function Button({ children, type }) {
  let styles;
  if (type === "danger") {
    styles = "text-zinc-100 w-[100%] text-center bg-red-700 p-2";
  }
  if (type === "primary") {
    styles =
      "bg-sky-600 text-zinc-900 rounded-md p-2 hover:bg-sky-500 hover:text-zinc-800 transition-all duration-200 outline-none";
  }
  if (type === "like") {
    styles = "w-[20px] h-[20px]";
  }
  return <button className={styles}>{children}</button>;
}

export default Button;
