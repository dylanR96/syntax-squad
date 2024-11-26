import { createBrowserRouter } from "react-router-dom";
import EditProfile from "../pages/Profile/EditProfile";
import Profile from "../pages/Profile/UserProfile";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Login />,
  // },
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
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/edit",
    element: <EditProfile />,
  },
  // {
  //   path: "/about",
  //   element: <About />,
  // },
]);

export default router;