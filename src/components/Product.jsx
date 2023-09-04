/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GetAllProducts } from '../api/GetAllProducts';
import { useOutletContext } from "react-router-dom";
import SidebarCart from "../components/CartSidebar";
import { addItemToCart } from '../api/Cart';
import { getUserCart } from '../api/Cart';


const Product = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart, isLoggedIn, token } = useOutletContext();
  

  async function getAllProducts() {
    try {
      const result = await GetAllProducts();
      if (result) {
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
    <div className="bg-gradient-to-t from-black to-grey-700 w-screen h-screen max-h-screen overflow-y-scroll">
      <h2 className="text-6xl text-center mt-5 mb-10 underline decoration-2 ">
        Products
      </h2>
      <div className='flex'>
        <SidebarCart cart={cart} />
        <div className="flex flex-wrap m-5 place-content-center mb-14">
          {products?.map((product) => (
            <div className="" key={product.id}>
              <ProductCard product={product} setCart={setCart} isLoggedIn={isLoggedIn} token={token} cart={cart}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, cart, setCart, isLoggedIn, token }) => {
  const navigate = useNavigate();

  const handleClick = () => {
 navigate(`/SingleProduct/${product.id}`);
  };

  const handleButtonClick = async () => {
    if (isLoggedIn) {
      const addedToCart = await addItemToCart(product.id, 1, token)
      if (addedToCart.message) {
        alert(addedToCart.message);
      } else {
        const userCart = await getUserCart(token);
        setCart(userCart);
      }
    } else { 
      console.log("cart before adding:", cart) 
      const inCart = cart.find((item) => {
          if (item.id === product.id) {
            return true
          }
        })
      if (inCart) {
        alert("Item already in cart")
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      console.log("cart after adding:", cart)
      
    }
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
        id="image"
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
