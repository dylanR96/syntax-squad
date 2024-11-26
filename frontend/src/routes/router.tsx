import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import Profile from "../pages/Profile/UserProfile";
import EditProfile from "../pages/Profile/EditProfile";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
    ],
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