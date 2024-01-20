function Loader() {
  return (
    <div className="fixed flex justify-center items-center inset-0 w-full h-full backdrop-blur-sm z-[999]">
      <div className="w-[30px] h-[30px] rounded-[100%] border-[4px] border-b-transparent border-sky-500 animate-spin"></div>
    </div>
  );
}

export default Loader;
