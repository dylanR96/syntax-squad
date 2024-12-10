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
import Confirmation from "../pages/Confirmation/Confirmation";
import Stock from "../pages/Admin/Ingredients/Ingredients";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "../pages/Admin/Product/Products";
import AdminLogin from "../pages/Admin/Login/Login";
import Order from "../pages/Orders/Order";
import Recipe2 from "../pages/Recipe/Recipe2";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <section className="base-layout">
        <Header />
        <div className="flex1">
          <Outlet />
        </div>
        <Footer />
      </section>
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
        path: "/recipe/:productID",
        element: <Recipe />,
      },
      {
        path: "/recipe2/:productID",
        element: <Recipe2 />,
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
        path: "/confirmation",
        element: <Confirmation />,
      },
      {
        path: "/confirmation/:orderNO",
        element: <Order />,
      },
      {
        path: "/admin",
        element: <AdminLogin />,
      },
      {
        path: "/admin/ingredients",
        element: <Stock />,
      },
      {
        path: "/admin/products",
        element: <Products />,
      },
    ],
  },

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
