/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GetAllProducts } from '../api/GetAllProducts';
import { useOutletContext } from "react-router-dom";
import SidebarCart from "../components/CartSidebar";


const Product = () => {
  const { cart } = useOutletContext();
const products = useState([]);
const setProducts = useState([]);

    useEffect(() => {
        const updateProducts = async () => {
            const newProductsData = await GetAllProducts();
            setProducts(newProductsData);
        }
        updateProducts();
    }, [])
    
    return (
      <div className="products-page">
        <SidebarCart cart={cart} />
        <h2 className="page-title">Products</h2>
        <div className="products-container">
          {products?.map((product) => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const ProductCard = ({ product, addCart }) => {
    const navigate = useNavigate();
    const handleClick = () => {
      
      navigate("/")
      navigate.push(`/products/${product.id}`);
    };
    const handleButtonClick = () => {
      console.log('added to cart!')
    }
    
    return (
      <div className="product" >
            <h3 onClick={handleClick}>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <img onClick={handleClick} className="product-card-image" src={product.image} alt={product.name} />
            <button className='add-to-cart-button' onClick={handleButtonClick} >Add to Cart</button>
        </div>
    );
  };
  
  export default Product;
