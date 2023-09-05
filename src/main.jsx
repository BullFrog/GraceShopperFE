import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Root from "./routes/root";
import Register from "./components/Register";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
import AdminOrders from "./components/AdminOrders";
import AdminProducts from "./components/AdminProducts";
import AdminSingleOrder from "./components/AdminSingleOrder";
import AdminSingleProduct from "./components/AdminSingleProduct";
import SingleProduct from "./components/SingleProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Logout",
        element: <Logout />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Product",
        element: <Product />,
      },
      {
        path: "/SingleProduct",
        element: <SingleProduct />,
      },
      {
        path: "/SingleProduct/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/Logout",
        element: <Logout />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/products/:productId",
        element: <AdminSingleProduct />,
      },
      {
        path: "/admin/orders/:orderId",
        element: <AdminSingleOrder />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
