import { useOutletContext } from "react-router-dom";
import { updateCartItem, removeFromCart, clearCart, getUserCart } from "../api/Cart"
import { useEffect } from "react";

const Cart = () => {
  //props needed: {cart}, {setCart}, {token}, {isLoggedIn}, {user}
  const {cart, setCart, token, user, isLoggedIn} = useOutletContext();
  useEffect(() => {
    getCart()
  }, [])

  const getCart = async () => {
    const userCart = await getUserCart(token);
    setCart(userCart);
  };

  //get total of all items in cart
  const subtotal = cart.reduce((total, currentItem) => {
    const itemTotal = (currentItem.price * currentItem.quantity)
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
              <div key={item.id}>
                {item.name} (${item.price}) {" "}
                <button
                  className="ml-1 text-red-500"
                  onClick={async () => {
                    updateCartItem(item.id, item.quantity - 1, token);
                    await getCart()
                  }}
                >
                  -
                </button>{" "}
                {item.quantity}
                {" "}
                <button
                  onClick={async () => {
                    updateCartItem(item.id, item.quantity + 1, token);
                    await getCart()
                  }}
                >
                  +
                </button>
              </div>
              <div className="m-2">
                Item total: ${item.price * item.quantity}
              </div>
            </>
          );
        })}
        <div className="m-2 mt-8 text-xl">Subtotal: ${subtotal}</div>
      <button className="underline mt-1">Checkout -&gt;</button>
      <div>
      <button className="mt-5 border border-red-500 rounded p-1"
      onClick={async () => {
        if (confirm("Are you sure you want to clear your cart?")) {
          await clearCart(token)
        }
      }}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
