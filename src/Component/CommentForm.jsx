import Button from "./Button";

function CommentForm({ isLoading, handler, setContent }) {
   return (
      <form onSubmit={handler} className="w-[100%] flex relative">
         <textarea
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="rounded-md w-[100%] bg-transparent border-b-[1px] outline-none px-3 py-1"
            placeholder="write a comment..."
         />
         <Button
            disabled={isLoading}
            extrastyles="rounded-md h-[40px] text-sm"
            type="primary"
         >
            Add comment
         </Button>
      </form>
   );
}

export default CommentForm;
