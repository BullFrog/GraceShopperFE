import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getAdminSingleProduct, updateProduct, deactivateProduct } from "../api/Admin";

const AdminSingleProduct = () => {
  const { token } = useOutletContext();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({})

  async function getSingleProduct() {
    try {
      const result = await getAdminSingleProduct(token, productId);
      console.log(result)
      setProduct(result);
      setUpdatedProduct(result)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  
  
  const handleDelete = async () => {
    if (confirm("Are you sure you want to discontinue this product?")) {
      try {
        const deletedProduct = await deactivateProduct(token, productId)
        if (deletedProduct) {
          alert(`Product ${product.name} successfully deleted`)
          navigate('/admin/products')
        }
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(updatedProduct)
    try {
      const updated = await updateProduct(token, productId, updatedProduct)
      console.log(updated)
      if (updated.id) {
        alert(`${product.name} succesfully updated`)
        navigate('/admin/products')
      }
    } catch (error) {
      console.error
    }
  }

  const handleChange = (event) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [event.target.id]: event.target.value,
    }));
  };


  if (product.id) {
  return (
    <>
      <div className="text-center mt-5">
        <button
          className="text-red-500 font-bold text-4xl"
          onClick={handleDelete}
        >
          Delete product
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-screen h-screen bg-gradient-to-t from-black to-grey-700 text-white flex flex-wrap place-content-center">
          <div className="w-2/6 h-4/5 bg-black rounded-3xl drop-shadow-lg flex flex-wrap place-content-center ">
            <h3 className="text-center w-screen mt-4 place-content-center text-2xl font-bold">
              <label htmlFor="name">Name:</label>
              <input
                value={updatedProduct.name}
                className="text-black"
                id="name"
                onChange={handleChange}
              ></input>
              <label htmlFor="category" className="text-xl">
                Category:
              </label>
              <input
                value={updatedProduct.category}
                className="text-black"
                id="category"
                onChange={handleChange}
              ></input>
            </h3>

            <label
              htmlFor="description"
              className="ml-4 font-light place-content-center m-2"
            >
              Description:
            </label>
            <input
              value={updatedProduct.description}
              className="text-black w-72"
              id="description"
              onChange={handleChange}
            ></input>
            <img
              className="ml-2 mr-2 w-11/12 h-4/6 rounded-xl w-96 flex flex-wrap "
              id="image"
              src={product.image}
              alt={product.name}
            />
            <label htmlFor="image">New link to image:</label>
            <input
              type="text"
              value={updatedProduct.image}
              className="text-black"
              id="image"
              onChange={handleChange}
            />
            <div>
              <label className="font-dark ">Price: $</label>
              <input
                htmlFor="price"
                type="number"
                value={updatedProduct.price}
                className="text-black w-12"
                id="price"
                onChange={handleChange}
              ></input>
            </div>
            <button className="m-4 font-bold text-blue-500" type="submit">
              Update product
            </button>
          </div>
        </div>
      </form>
    </>
  );
  } else {
    return (
      <p className="text-center">No product found!</p>
    )
  }
};


export default AdminSingleProduct;

