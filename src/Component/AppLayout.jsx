import { Outlet } from "react-router";
import Nav from "./Nav";

function AppLayout() {
  return (
    <div className="w-full min-h-[100vh] grid grid-rows-[auto_1fr] gap-3 justify-center font-Changa relative bg-zinc-800 text-zinc-100 text-md">
      App Layout
      <Nav />
      <main className="w-[60vw] flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
