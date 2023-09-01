/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProducts } from "../api/GetAllProducts";
import { useOutletContext } from "react-router-dom";
import SidebarCart from "../components/CartSidebar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart } = useOutletContext();

  async function getAllProducts() {
    try {
      const result = await GetAllProducts();
      if (result) {
        console.log("getting all products", result);
        setProducts(result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <body>
      <img
        src="https://cdn.wallpapersafari.com/72/27/Kn5Dz2.jpg"
        className="w-screen h-screen"
      ></img>
      <div className="absolute top-80 w-screen text-7xl text-center text-white font-light">
        All the games you will ever need
      </div>
      <div
        className="w-screen  flex justify-center items-center
    bg-gradient-to-b from-black to-grey-700 overflow-hidden"
      >
        <div className="flex flex-wrap  place-content-center mb-14">
          {products?.map((product) => (
            <div className="" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <SidebarCart cart={cart} />
      </div>
    </body>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    navigate.push(`/products/${product.id}`);
  };
  const handleButtonClick = () => {
    console.log("added to cart!");
  };

  return (
    <div className="w-56 h-max m-10 bg-black text-white rounded-3xl">
      <h3 onClick={handleClick} className="text-center text-lg font-bold">
        {product.name}
      </h3>
      <p className="ml-4 font-light">{product.description}</p>
      <img
        onClick={handleClick}
        className="ml-3 rounded-xl"
        src={product.image}
        alt={product.name}
      />
      <p className="ml-4 font-dark">Price: ${product.price}</p>
      <button
        className="ml-4 font-bold text-blue-500"
        onClick={handleButtonClick}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Home;
