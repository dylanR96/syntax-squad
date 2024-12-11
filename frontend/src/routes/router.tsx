import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
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
import Recipe2 from "../pages/Recipe/Recipe2";
type ProtectedTypeProps = {
  allowedRoles: string[];
};
const ProtectedRoute: React.FC<ProtectedTypeProps> = ({ allowedRoles }) => {
  const userRole = sessionStorage.getItem("userRole");
  if (userRole) {
    if (!allowedRoles.includes(userRole)) {
      return (
        <Navigate to={allowedRoles[0] != "admin" ? "/" : "/admin"} replace />
      );
    }
    return <Layout />; // Render children if the role matches
  } else {
    return (
      <Navigate to={allowedRoles[0] != "admin" ? "/" : "/admin"} replace />
    );
  }
};

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
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/",
    // element: <Layout />,
    element: <ProtectedRoute allowedRoles={["customer", "admin"]} />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      // {
      //   path: "/recipe/:productID",
      //   element: <Recipe />,
      // },
      {
        path: "/recipe/:productID",
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
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
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
