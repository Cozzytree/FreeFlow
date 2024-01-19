import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Component/AppLayout";
import Tweet from "./Pages/Tweet";
import Settings from "./Pages/Settings";
import WatchHistory from "./Pages/WatchHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Video from "./Pages/Video";

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Video />,
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
    </QueryClientProvider>
  );
}

export default App;
