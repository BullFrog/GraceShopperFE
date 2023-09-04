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
      <div className="flex-col text-center">
        <div className="text-center underline m-2">New product:</div>
        <form className="text-center flex-col" onSubmit={handleSubmit}>
          <div className="m-2">
            <label htmlFor="name">Product Name:</label>
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
            <label htmlFor="category">Product category:</label>
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
            <label htmlFor="description">Product description:</label>
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
            <label htmlFor="image">Link to image:</label>
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
            <label htmlFor="price">Product price:</label>
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
            <label htmlFor="inventory">Initial inventory:</label>
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
            className="mt-3 text-xl border-black border-2 rounded-lg"
          >
            -Create product-
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminNewProductForm;
