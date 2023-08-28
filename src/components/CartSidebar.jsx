import { Link } from "react-router-dom";

const SidebarCart = () => {
    //props needed: {cart}
  return (
    <div className="text-black bg-gray-300 border-2 rounded border-black w-1/4 m-5 flex-col p-3">
        <Link to={"/Cart"} className="underline">View whole cart</Link>
      <div className="text-2xl text-center mb-2">Your cart:</div>
      <p className="text-sm mb-2">Quantity x Item 1</p>
      <p className="text-sm mb-2">Quantity x Item 2</p>
      <p className="text-sm mb-2">Quantity x Item 3</p>
    </div>
  );
};

export default SidebarCart;
