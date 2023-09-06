import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { updateCartItem, removeFromCart, clearCart, getUserCart } from "../api/Cart"
import { useEffect } from "react";
import GuestCheckoutForm from "./GuestCheckoutForm";
import { createOrder } from "../api/Orders";

const Cart = () => {
  //props needed: {cart}, {setCart}, {token}, {isLoggedIn}, {user}
  const {cart, setCart, token, user, isLoggedIn} = useOutletContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn) {
      getCart() }
  }, [])

  const getCart = async () => {
    const userCart = await getUserCart(token);
    setCart(userCart);
  };

  

  if (!cart.length) {
    return (
      <Link to={'/Product'}>Your cart is empty! Click here to find some awesome products</Link >
    )
  } else {
    //get total of all items in cart
    const subtotal = cart.reduce((total, currentItem) => {
      const itemTotal = currentItem.price * currentItem.quantity;
      return total + itemTotal;
    }, 0);
    return (
      <div className="bg-gradient-to-t from-black to-grey-700 h-screen">
        <h3 className="text-3xl text-center m-6">
          Here&apos;s what you&apos;ve got so far:
        </h3>
        {cart &&
          cart.map((item, index) => {
            return (
              <>
                <div
                  key={item.id}
                  className="text-xl uppercase flex justify-center items-center"
                >
                  {item.name} (${item.price}){" "}
                  <button
                    className="ml-1 text-red-500"
                    onClick={() => {
                      const newQuantity = item.quantity - 1;
                      if (newQuantity < 1) {
                        alert(
                          "You can't put less than 1 of an item in your cart; remove it instead"
                        );
                      } else if (isLoggedIn && token) {
                        updateCartItem(item.id, item.quantity - 1, token);
                        getCart();
                      } else {
                        console.log("quantity - 1");
                      }
                    }}
                  >
                    -
                  </button>{" "}
                  {item.quantity}{" "}
                  <button
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      if (newQuantity >= item.inventory) {
                        alert("You can't purchase more than is in stock!");
                      } else if (isLoggedIn && token) {
                        updateCartItem(item.id, newQuantity, token);
                        getCart();
                      } else {
                        console.log("quantity + 1");
                      }
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="m-3 flex flex-wrap place-content-center">
                  <button
                    className="underline mr-3 inline-block rounded-3xl px-2 text-sm font-light uppercase bg-black text-white"
                    onClick={() => {
                      if (isLoggedIn && token) {
                        removeFromCart(item.id, token);
                        getCart();
                      } else {
                        const { [index]: removedItem, ...rest } = cart;
                        console.log(removedItem);
                        console.log(rest);
                      }
                    }}
                  >
                    -remove-{" "}
                  </button>{" "}
                  Item total: ${item.price * item.quantity}
                </div>
              </>
            );
          })}
        <div className="m-2 mt-8 text-xl underline flex flex-wrap place-content-center mb-14">
          Subtotal: ${subtotal}
        </div>
        <div className="flex flex-wrap place-content-center">
          <button
            className="inline-block rounded-3xl px-3 pb-2.5 pt-3 text-sm font-dark uppercase bg-blue-600 text-white"
            onClick={() => {
              if (confirm("Are you sure you want to clear your cart?")) {
                clearCart(token);
                setCart([]);
                navigate("/Product");
              }
            }}
          >
            Clear Cart
          </button>
        </div>
        {isLoggedIn ? (
          <button
            className="underline mt-1"
            onClick={async () => {
              if (
                confirm(
                  "Double check your information before submitting: user info"
                )
              ) {
                const order = await createOrder(cart, token);
                if (order) {
                  clearCart(token);
                  setCart([]);
                  alert(
                    `Order #${order.id} created succesfully. Check your profile for full order details`
                  );
                  navigate("/Product");
                }
              }
            }}
          >
            Looks good? Checkout -&gt;
          </button>
        ) : (
          <GuestCheckoutForm setCart={setCart} />
        )}
      </div>
    );
  }
};

export default Cart;
