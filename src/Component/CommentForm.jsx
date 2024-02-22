import Button from "./Button";

function CommentForm({ isLoading, handler, setContent }) {
   return (
      <form onSubmit={handler} className="w-[100%] flex relative">
         <input
            onChange={(e) => setContent(e.target.value)}
            type="text"
            id="content"
            className="rounded-md w-[100%] text-xs md:text-sm bg-transparent border-b-[1px] outline-none px-3 py-1"
            placeholder="write a comment..."
         />
         <Button
            disabled={isLoading}
            extrastyles="rounded-md h-[40px] text-xs"
            type="primary"
         >
            Add comment
         </Button>
      </form>
   );
}

export default CommentForm;
