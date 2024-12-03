import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/UserProfile";
import EditProfile from "../pages/Profile/EditProfile";
import Recipe from "../pages/Recipe/Recipe";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders/Orders";
import About from "../pages/About/About";
import Checkout from "../pages/Checkout/Checkout";
import Register from "../pages/Register/Register";
import Stock from "../pages/Admin/Stock/Ingredients";
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

const NoFooterLayout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
        path: "/orders",
        element: <Orders />,
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

  // {
  //   path: "/confirmation",
  //   element: <Confirmation />,
  // },
  //{
  //path: "/stock",
  //element: <Stock />,
  //},
  {
    path: "/",
    element: <NoFooterLayout />,
    children: [
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
