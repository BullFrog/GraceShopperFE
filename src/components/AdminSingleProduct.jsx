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
      <div className="text-center mt-3">
        <button
          className="inline-block rounded-3xl px-3 pb-2.5 pt-3 text-3xl font-medium uppercase bg-black text-red-500"
          onClick={handleDelete}
        >
          Delete product
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-screen h-screen bg-gradient-to-t from-black to-grey-700 text-white flex place-content-center overflow-y-scroll">
          <div className="mt-3 w-2/6 h-fit bg-black rounded-3xl flex flex-wrap">
            <h3 className="text-center w-screen mt-4 place-content-center text-2xl font-bold">
              <label htmlFor="name" className="text-2xl">
                Name:{" "}
              </label>
              <input
                value={updatedProduct.name}
                className="text-black bg-gray-300"
                id="name"
                onChange={handleChange}
              ></input>
              <div className="m-2">
                <label htmlFor="category" className="text-2xl">
                  Category:{" "}
                </label>
                <input
                  value={updatedProduct.category}
                  className="text-black bg-gray-300"
                  id="category"
                  onChange={handleChange}
                ></input>
              </div>
            </h3>

            <label
              htmlFor="description"
              className="text-center w-screen text-3xl font-bold underline decoration-1"
            >
              Description:
            </label>
            <input
              value={updatedProduct.description}
              className="m-2 font-light text-center flex flex-wrap w-screen text-xl bg-black"
              id="description"
              onChange={handleChange}
            ></input>
            <img
              className="ml-2 mr-2 w-11/12 h-4/6 rounded-xl w-96 w-screen"
              id="image"
              src={product.image}
              alt={product.name}
            />
            <div className="ml-4 w-screen">
              <label htmlFor="image">New link to image: </label>
              <input
                type="text"
                value={updatedProduct.image}
                className="m-1 text-xl text-black bg-gray-300"
                id="image"
                onChange={handleChange}
              />
            </div>
            <div className="ml-4 w-screen">
              <label className="">Price: $</label>
              <input
                htmlFor="price"
                type="number"
                value={updatedProduct.price}
                className="m-1 text-xl text-black bg-gray-300"
                id="price"
                onChange={handleChange}
              ></input>
            </div>
            <button
              className="m-4 font-bold text-blue-500 text-xl"
              type="submit"
            >
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

