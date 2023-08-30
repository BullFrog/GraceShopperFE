import SidebarCart from "../components/CartSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";



const Product = () => {

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [token, setToken] = useState("");
const [user, setUser] = useState(null);
const [cart, setCart] = useState([]);

return (
  <div className="w-full h-2 ">
    <span className="flex h-screen">
      <SidebarCart cart={cart} />
      <Outlet 
        context={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          cart,
          setCart,
        }}
      />
      <span
        className="loginContainer w-screen h-screen flex justify-center items-center
    bg-gradient-to-r from-black to-grey-700"
      >
        Products
      </span>

    </span>
  </div>
)};

export default Product;
