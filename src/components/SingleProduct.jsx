import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { GetProductId } from "../api/GetProductId";
import { useOutletContext } from "react-router-dom";
import { addItemToCart } from "../api/Cart";
import { getUserCart } from "../api/Cart";

const SingleProduct = () => {
    const { cart, setCart, isLoggedIn, token } = useOutletContext();

  const handleButtonClick = async () => {
    if (isLoggedIn) {
      const addedToCart = await addItemToCart(product.id, 1, token);
      if (addedToCart.message) {
        alert(addedToCart.message);
      } else {
        const userCart = await getUserCart(token);
        setCart(userCart);
      }
    } else {
      console.log("cart before adding:", cart);
      const inCart = cart.find((item) => {
        if (item.id === product.id) {
          return true;
        }
      });
      if (inCart) {
        alert("Item already in cart");
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      console.log("cart after adding:", cart);
    }
  };

  const [product, setProducts] = useState([]);

  async function getProductsId() {
    try {
      const result = await GetProductId(productId);
      if (result) {
        setProducts(result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductsId();
  }, []);

  let { productId } = useParams();
  return (
    <div className="w-screen h-screen bg-gradient-to-t from-black to-grey-700 text-white flex flex-wrap place-content-center">
      <div className="w-2/6 h-4/5 bg-black rounded-3xl drop-shadow-lg flex flex-wrap place-content-center ">
        <h3 className="text-center w-screen mt-8 place-content-center h-14 text-xl font-bold">
          {product.name}
        </h3>
        <p className="ml-4 font-light h-20 place-content-center">
          {product.description}
        </p>
        <img
          className="ml-2 mr-2 w-11/12 h-4/6 rounded-xl w-96 flex flex-wrap "
          id="image"
          src={product.image}
          alt={product.name}
        />
        <p className="m-4 pb-4 font-dark ">Price: ${product.price}</p>
        <button
          onClick={handleButtonClick}
          className="m-4 pb-4 font-bold text-blue-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
