function AreYouSure({ label, children }) {
     return (
          <div className="border-[1px] p-3 bg-zinc-700 z-[999]">
               <p>{label}</p>
               {children}
          </div>
     );
}

export default AreYouSure;
