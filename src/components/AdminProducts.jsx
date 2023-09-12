/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AdminNewProductForm from "./AdminNewProductForm";
import { getAdminProducts, cycleCountProduct } from "../api/Admin";
import { useNavigate, useOutletContext } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const {token} = useOutletContext();
  
  
  async function getAllProducts() {
    try {
      const AdminProducts = await getAdminProducts(token);
        setProducts(AdminProducts);
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
      <AdminNewProductForm token={token} getAllProducts={getAllProducts}/>
      <div className="flex flex-wrap m-5 place-content-center mb-14">
        {products?.map((product) => (
          <div className="" key={product.id}>
            <ProductCard product={product} token={token} getAllProducts={getAllProducts}/>
          </div>
        ))}
      </div>
    </div>
  );
};



const ProductCard = ({ product, token, getAllProducts }) => {
  const [cycleCount, setCycleCount] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleCountSubmit = async (event) => {
    event.preventDefault();
    try {
      const updateCount = await cycleCountProduct(token, product.id, cycleCount);
      if (updateCount) {
        alert(`${product.name} inventory changed to ${cycleCount}`)
        setCycleCount("")
        getAllProducts()
      } else {
        alert('error updating the count')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-56 h-max m-3 bg-black  text-white rounded-3xl drop-shadow-lg border-2">
      {product.active ? null : <p className="text-red-500 text-center">discontinued</p>}
      <h3 onClick={handleClick} className="text-center text-lg font-bold">
        {product.name}
      </h3>
      <p className="ml-4 font-light">{product.description}</p>
      <img
        onClick={handleClick}
        className="pl-3 pr-3"
        src={product.image}
        alt={product.name}
      />
      <p className="ml-4 font-dark">Price: ${product.price}</p>
      <p className="ml-4">Stock: {product.inventory}</p>
      <form className="ml-4" onSubmit={handleCountSubmit}>
        <label>New stock:</label>
        <input required type="number" className="w-8 ml-1 text-black" value={cycleCount} onChange={(event) => {setCycleCount(event.target.value)}}></input>
        <button className="ml-2 text-green-500 bold">update</button>
      </form>
    </div>
  );
};

export default AdminProducts;
