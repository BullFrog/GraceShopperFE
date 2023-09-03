/* eslint-disable react/prop-types */
import React from "react";
import { useParams } from "react-router-dom";

const SingleProductPage = ({ product }) => {

  let { productId } = useParams();
  const thisProduct = product[productId - 1];
  console.log("thisProduct is ", thisProduct);
  return (
    <div className="">
      <h3>{thisProduct.name}</h3>
      <p className="">{thisProduct.description}</p>
      <p className="">Price: ${thisProduct.price}</p>
      <img
        className=""
        src={thisProduct.image}
        alt={thisProduct.name}
      />
      <button>Add to Cart</button>
    </div>
  );
};

export default SingleProductPage;
