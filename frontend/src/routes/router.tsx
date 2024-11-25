import { createBrowserRouter, RouteObject } from "react-router-dom";
import Recipe from "../pages/Recipe/Recipe";

const routes: RouteObject[] = [
  // {
  //   path: "/",
  //   element: <Login />,
  // },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  {
    path: "/recipe/",
    element: <Recipe/>,
  },
  // {
  //   path: "/checkout",
  //   element: <Checkout />,
  // },
  // {
  //   path: "/confirmation",
  //   element: <Confirmation />,
  // },
  // {
  //   path: "/stock",
  //   element: <Stock />,
  // },
  // {
  //   path: "/orders",
  //   element: <Orders />,
  // },
  //{
  //path: "/profile",
  //element: <UserProfile />,
  //},
  // {
  //   path: "/profile/edit",
  //   element: <EditProfile />,
  // },
  // {
  //   path: "/about",
  //   element: <About />,
  // },
];

const router = createBrowserRouter(routes);

export default router;

