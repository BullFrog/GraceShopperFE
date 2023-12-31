import { Link, useOutletContext } from "react-router-dom";

const SidebarCart = () => {
    //props needed: {cart}
    const {cart} = useOutletContext();
    if (cart.length) {
  return (
    <div className="text-black bg-gray-300 border-2 rounded border-black w-1/4 m-5 flex-col p-3">
        <Link to={"/Cart"} className="underline">View whole cart</Link>
      <div className="text-2xl text-center mb-2">Your cart:</div>
      {cart.length && cart.map((item) => {
        return (
            <p key={item.id}>{item.quantity} x {item.name}</p>
        )
      })}
    </div>
  );
    } else {
        return null
    }
};

export default SidebarCart;
