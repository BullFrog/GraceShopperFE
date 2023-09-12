/* eslint-disable react/prop-types */
import { createProduct } from "../api/Admin";
import { useState } from "react";

const AdminNewProductForm = ({token, getAllProducts}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    price: "",
    inventory: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newProduct, token)

    try {
      const createdProduct = await createProduct(token, newProduct)
      console.log(createdProduct)
      if (createdProduct.id) {
      setNewProduct({
        name: "",
        category: "",
        description: "",
        image: "",
        price: "",
        inventory: "",
      });
      getAllProducts();
    }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    setNewProduct((prevNewProduct) => ({
      ...prevNewProduct,
      [event.target.id]: event.target.value
    }))
  }

  return (
    <>
      <div className="flex-col text-center border-4 bg-black p-2 border-blue-500 rounded-2xl">
        <div className="text-center underline m-2 text-2xl text-white">New product:</div>
        <form className="text-center flex-col" onSubmit={handleSubmit}>
          <div className="m-2">
            <label htmlFor="name" className="text-white">
              Product Name:{" "}
            </label>
            <input
              placeholder="new product name"
              className=""
              required
              type="text"
              value={newProduct.name}
              onChange={handleChange}
              id="name"
            ></input>
          </div>
          <div className="m-2">
            <label htmlFor="category" className="text-white">
              Product category:{" "}
            </label>
            <input
              placeholder="new product category"
              className=""
              required
              type="text"
              value={newProduct.category}
              onChange={handleChange}
              id="category"
            ></input>
          </div>
          <div className="m-2">
            <label htmlFor="description" className="text-white">
              Product description:{" "}
            </label>
            <input
              placeholder="new product description"
              className=""
              required
              type="text"
              value={newProduct.description}
              onChange={handleChange}
              id="description"
            ></input>
          </div>
          <div className="m-2">
            <label htmlFor="image" className="text-white">
              Link to image:{" "}
            </label>
            <input
              placeholder="new product image"
              className=""
              required
              type="text"
              value={newProduct.image}
              onChange={handleChange}
              id="image"
            ></input>
          </div>
          <div className="m-2">
            <label htmlFor="price" className="text-white">
              Product price:{" "}
            </label>
            <input
              placeholder="new product price"
              className=""
              required
              type="number"
              value={newProduct.price}
              onChange={handleChange}
              id="price"
            ></input>
          </div>
          <div className="m-2">
            <label htmlFor="inventory" className="text-white">
              Initial inventory:{" "}
            </label>
            <input
              placeholder="new product inventory"
              className=""
              required
              type="number"
              value={newProduct.inventory}
              onChange={handleChange}
              id="inventory"
            ></input>
          </div>
          <button
            type="submit"
            className="mt-3 text-xl border-blue-500 border-2 rounded-lg text-blue-500 bg-black"
          >
            -Create product-
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminNewProductForm;
