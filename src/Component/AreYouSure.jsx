function AreYouSure({ label, children }) {
   return (
      <div className="bg-zinc-900/20 text-zinc-50 flex flex-col items-center gap-4 p-8">
         <p>{label}</p>
         {children}
      </div>
   );
}

export default AreYouSure;
