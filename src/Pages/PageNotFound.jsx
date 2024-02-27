import Link from "../Component/Link";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";

function PageNotFound() {
   useDocumentTitle("Page not Found");
   return (
      <div className="bg-zinc-800 w-[100%] h-[100vh] text-zinc-100 flex flex-col gap-3 justify-center items-center font-MPLUS ">
         <h1 className="text-xl">
            <strong className="text-3xl">404</strong> Page Not Found
         </h1>
         <Link to={"/"}>Home &rarr;</Link>
      </div>
   );
}

export default PageNotFound;
