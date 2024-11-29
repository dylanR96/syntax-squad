import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/UserProfile";
import EditProfile from "../pages/Profile/EditProfile";
import Recipe from "../pages/Recipe/Recipe";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders/Orders";


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

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },

      {
        path: "/home",
        element: <Home/>,
        },

        {
          path: "/orders",
         element: <Orders/>,
         },
      
    ],
  },  

  // {
  //   path: "/checkout",
  //   element: <Checkout />,
  // },
  // {
  //   path: "/confirmation",
  //   element: <Confirmation />,
  // },
 //{
  //path: "/stock",
  //element: <Stock/>,
 //},


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