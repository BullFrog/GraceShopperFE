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
      <div>
        <h3 className="text-3xl text-center mb-2">
          Here&apos;s what you&apos;ve got so far:
        </h3>
        {cart &&
          cart.map((item) => {
            return (
              <>
                <div key={item.id} className="text-xl">
                  {item.name} (${item.price}){" "}
                  <button
                    className="ml-1 text-red-500"
                    onClick={() => {
                      updateCartItem(item.id, item.quantity - 1, token);
                      getCart();
                    }}
                  >
                    -
                  </button>{" "}
                  {item.quantity}{" "}
                  <button
                    onClick={() => {
                      updateCartItem(item.id, item.quantity + 1, token);
                      getCart();
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="m-3">
                  <button
                    className="underline mr-3"
                    onClick={() => {
                      removeFromCart(item.id, token);
                      getCart();
                    }}
                  >
                    -remove-{" "}
                  </button>{" "}
                  Item total: ${item.price * item.quantity}
                </div>
              </>
            );
          })}
        <div className="m-2 mt-8 text-xl">Subtotal: ${subtotal}</div>
        {isLoggedIn ? (
          <button className="underline mt-1" onClick={ async () => {
            if (confirm("Double check your information before submitting: user info")) {
              const order = await createOrder(cart, token)
                if (order) {
                  clearCart(token)
                  setCart([])
                  alert(`Order #${order.id} created succesfully. Check your profile for full order details`)
                  navigate("/Product")
                }
            }
          }}
          >Looks good? Checkout -&gt;</button>
        ) : (
          <GuestCheckoutForm setCart={setCart}/>
        )}
        <div>
          <button
            className="mt-5 border border-red-500 rounded p-1"
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
      </div>
    );
  }
};

export default Cart;
