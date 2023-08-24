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
        path: "/Home",
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
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/Logout",
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
