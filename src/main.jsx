import { lazy, Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { ThemeProvider } from "./components/Context/ThemeContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "./components/PageLoader.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const VideoWatchPage = lazy(() => import("./pages/VideoWatchPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const CreateChannelPage = lazy(() => import("./pages/CreateChannelPage"));
const ChannelPage = lazy(() => import("./pages/ChannelPage"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/watch/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <VideoWatchPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/create",
        element: (
          <Suspense fallback={<PageLoader />}>
            {" "}
            <CreateChannelPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChannelPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={appRouter} />
  </ThemeProvider>,
);
