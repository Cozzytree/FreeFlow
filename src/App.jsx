import AppLayout from "./Component/AppLayout";
import Tweet from "./Pages/Tweet";
import Settings from "./Pages/Settings";
import WatchHistory from "./Pages/WatchHistory";
import Videos from "./Pages/Videos";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import VideoView from "./Pages/VideoView";
import UserVideos from "./Pages/UserVideos";
import UserTweets from "./Pages/UserTweets";
import Loader from "./Component/loader";
import Playlist from "./Pages/Playlist";
import PageNotFound from "./Pages/PageNotFound";
import TweetInDetail from "./Pages/TweetInDetail";
import SearchResults from "./Pages/SearchResults";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { GlobalContextProvider } from "./Hooks/context/globalContext";

const route = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout />,
      children: [
         { path: "/", element: <Videos /> },
         { path: "/u/:userId/videos", element: <UserVideos /> },
         { path: "/u/:userId/tweets", element: <UserTweets /> },
         { path: "/tweets", element: <Tweet /> },
         { path: "/post/:postId", element: <TweetInDetail /> },
         { path: "/settings", element: <Settings /> },
         { path: "/:userId/watch_history", element: <WatchHistory /> },
         { path: "/login", element: <Login /> },
         { path: "/signUp", element: <SignUp /> },
         { path: "/v/:videoId", element: <VideoView /> },
         { path: "/pl/:playlistId", element: <Playlist /> },
         { path: "/query/:q", element: <SearchResults /> },
      ],
   },
   { path: "*", element: <PageNotFound /> },
]);

const toastOptions = {
   duration: 4000,
   style: {
      background: "#1a1a1a",
      color: "#d9d9d9",
      width: "200px",
      backdropFilter: blur("2px"),
   },
};

const client = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 2000,
         refetchOnMount: true,
      },
   },
});

function App() {
   return (
      <Suspense fallback={<Loader />}>
         <GlobalContextProvider>
            <QueryClientProvider client={client}>
               <RouterProvider router={route} />
               <Toaster
                  position="top-right"
                  reverseOrder={true}
                  toastOptions={toastOptions}
               />
               <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
         </GlobalContextProvider>
      </Suspense>
   );
}

export default App;
