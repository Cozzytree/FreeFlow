import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AppLayout from "./Component/AppLayout";
import Tweet from "./Pages/Tweet";
import Settings from "./Pages/Settings";
import WatchHistory from "./Pages/WatchHistory";
import Videos from "./Pages/Videos";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import User from "./Pages/User";
import VideoView from "./Pages/VideoView";

const route = createBrowserRouter([
     {
          path: "/",
          element: <AppLayout />,
          children: [
               {
                    path: "/",
                    element: <Videos />,
               },
               {
                    path: "/u/:username",
                    element: <User />,
               },
               {
                    path: "/tweets",
                    element: <Tweet />,
               },
               {
                    path: "/settings",
                    element: <Settings />,
               },
               {
                    path: "/watch_history",
                    element: <WatchHistory />,
               },
               {
                    path: "/login",
                    element: <Login />,
               },
               {
                    path: "/signUp",
                    element: <SignUp />,
               },
               {
                    path: "/v/:videoId",
                    element: <VideoView />,
               },
          ],
     },
]);

const client = new QueryClient({
     defaultOptions: {
          queries: { staleTime: 0 },
     },
});

function App() {
     return (
          <QueryClientProvider client={client}>
               <RouterProvider router={route} />
               <Toaster
                    position="top-right"
                    reverseOrder={true}
                    toastOptions={{
                         duration: 4000,
                         style: {
                              background: "#1a1a1a",
                              color: "#d9d9d9",
                              width: "200px",
                         },
                    }}
               />
          </QueryClientProvider>
     );
}

export default App;
