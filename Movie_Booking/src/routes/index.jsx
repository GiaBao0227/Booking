// import AdminTemplate from "../pages/AdminTemplate";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import HomeTemplate from "../pages/HomeTemplate";
// import HomePage from "../pages/HomeTemplate/HomePage";
// import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
// import DashboardPage from "../pages/AdminTemplate/DashboardPage";
// import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import { Route } from "react-router-dom";
// import NewsPage from "../pages/HomeTemplate/NewPage";
// import ShopingPhonePage from "../pages/HomeTemplate/PhoppingPhonePage";
// import HookPage from "../pages/HomeTemplate/Hooks";
import DetailMoviePage from "../pages/HomeTemplate/DetailMovie";
import PageNotFound from "../pages/PageNotFound";
import ShowtimesMoviesPage from "../pages/HomeTemplate/ShowtimesMovies";
import BookingPage from "../pages/HomeTemplate/Booking";
// import SignIn from "../pages/HomeTemplate/SignIn";
// import SignUp from "../pages/HomeTemplate/SignUp";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    children: [
      {
        path: "",
        element: ListMoviePage,
      },
      {
        path: "list-movie",
        element: ListMoviePage,
      },
      {
        path: "theater-chain",
        element: ShowtimesMoviesPage,
      },
      {
        path: "booking/:id",
        element: BookingPage,
      },
      {
        path: "detail/:id",
        element: DetailMoviePage,
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
  {
    path: "*",
    element: PageNotFound,
  },
  // {
  //   path: "sign-in",
  //   element: SignIn,
  // },
  // {
  //   path: "sign-up",
  //   element: SignUp,
  // },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
