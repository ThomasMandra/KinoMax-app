import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Movies from "./pages/Movies/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import ActrorDetail from "./pages/ActrolDetail/ActrorDetail";
import { MOVIE_LISTS, TOP_LIST_MOBILE } from "../constant";
import MoviesListTop from "./pages/MoviesListTop/MoviesListTop";
import MoviesListMain from "./pages/MoviesListMain/MoviesListMain";
import Collection from "./pages/Collection/Collection";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Movies />,
        },
        ...TOP_LIST_MOBILE.map((el) => ({
          path: el.url,
          element: <MoviesListTop />,
        })),
        ...MOVIE_LISTS.map((el) => ({
          path: el.url,
          element: <MoviesListMain />,
        })),
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/actor/:id",
          element: <ActrorDetail />,
        },
        {
          path: "/collection",
          element: <Collection />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
