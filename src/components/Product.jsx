import SidebarCart from "../components/CartSidebar";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";



const Product = () => {
const { cart } = useOutletContext();
return (
  <div className="w-full h-2 ">
    <span className="flex h-screen">
      <SidebarCart cart={cart} />

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
