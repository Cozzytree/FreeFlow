import Button from "./Button";

function AreYouSure({ label, children, confirm, hadler, loader }) {
   return (
      <div className="modal text-sm md:text-base bg-transparent text-zinc-50 flex flex-col items-center gap-4 p-8">
         <p className="text-center font-md">{label}</p>
         {children}
         <Button
            extrastyles="rounded-sm"
            onClick={hadler}
            type="danger"
            disabled={loader}
         >
            {confirm}
         </Button>
      </div>
   );
}

export default AreYouSure;
