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
import Register from "../pages/Register/Register";
import Confirmation from "../pages/Confirmation/Confirmation";

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
        element: <Orders/>,
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
        path: "/confirmation",
        element: <Confirmation />,
      },
    ],
  },  


  // {
  //   path: "/checkout",
  //   element: <Checkout />,
  // },

 //{
  //path: "/stock",
  //element: <Stock />,
 //},





]);

export default router;
