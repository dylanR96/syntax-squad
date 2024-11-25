import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  // {
  //   path: "/recipe/:id",
  //   element: <Recipe />,
  // },
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
  // {
  //   path: "/profile",
  //   element: <Profile />,
  // },
  // {
  //   path: "/profile/edit",
  //   element: <EditProfile />,
  // },
  // {
  //   path: "/about",
  //   element: <About />,
  // },
]);

export default router;
