function MiniSpinner() {
   return (
      <div className="w-full flex justify-center">
         {" "}
         <div className="w-[30px] h-[30px] p-2 rounded-full border-t-[3px] border-t-[#54c3f2] border-r-[3px] border-r-transparent animate-spin transition-all duration-200"></div>
      </div>
   );
}
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   display: inline-block;
//   border-top: 3px solid #FFF;
//   border-right: 3px solid transparent;
//   box-sizing: border-box;
//   animation: rotation 1s linear infinite;
export default MiniSpinner;
