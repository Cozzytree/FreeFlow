import Button from "./Button";

function AreYouSure({ label, children, confirm, hadler, loader }) {
   return (
      <div className="modal bg-transparent text-zinc-50 flex flex-col items-center gap-4 p-8">
         <p className="text-md font-md">{label}</p>
         {children}
         <Button onClick={hadler} type="danger" disabled={loader}>
            {confirm}
         </Button>
      </div>
   );
}

export default AreYouSure;
