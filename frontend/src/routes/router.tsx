import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/UserProfile";
import EditProfile from "../pages/Profile/EditProfile";
import Recipe from "../pages/Recipe/Recipe";
import Login from "../pages/Login/Login";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import Stock from "../pages/Stock/Stock";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/edit",
        element: <EditProfile />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/admin/stock",
        element: <Stock />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
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
]);

export default router;
