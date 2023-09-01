/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GetAllProducts } from '../api/GetAllProducts';
import { useOutletContext } from "react-router-dom";
import SidebarCart from "../components/CartSidebar";


const Product = () => {
  const { cart } = useOutletContext();
  const [products, setProducts] = useState([]);

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
    <div className="bg-gradient-to-t from-black to-grey-700">
      <SidebarCart cart={cart} />
      <h2 className="text-6xl text-center mt-5 mb-10 underline decoration-2">Products</h2>
      <div className="flex flex-wrap m-5 place-content-center">
        {products?.map((product) => (
          <div className="" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
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
    <div className="w-56 h-max m-3 bg-black  text-white rounded-3xl drop-shadow-lg">
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
  
  export default Product;
