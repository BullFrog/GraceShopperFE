import { useOutletContext, useParams } from "react-router-dom"
import { getAdminSingleOrder, updateOrderStatus } from "../api/Admin";
import { useEffect, useState } from "react";

const AdminSingleOrder = () => {
    const { orderId } = useParams();
    const {token} = useOutletContext();
    const [order, setOrder] = useState({});
    const [updatedStatus, setUpdatedStatus] = useState("")
    
    useEffect(() => {
        getOrder()
    },[])

    const getOrder = async () => {
        const singleOrder = await getAdminSingleOrder(token, orderId)
        setOrder(singleOrder)
        console.log(singleOrder)
    }
    const date = order.orderDate;
    const orderTime = new Date(date);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const update = await updateOrderStatus(token, order.id, updatedStatus)
        setUpdatedStatus("")
        getOrder()
        console.log(update)
    }
    
    if (order.id) {
    const subtotal = order.products.reduce((total, currentItem) => {
      const itemTotal = currentItem.price * currentItem.quantity;
      return total + itemTotal;
    }, 0);
    
    return (
      <div className="text-center h-screen w-screen bg-gradient-to-t from-black to-grey-700">
        <div className="text-4xl m-4 mt-20">Order #{order.id}</div>
        <div className="text-2xl">Status: {order.status}</div>
        <form className="m-4" onSubmit={handleSubmit}>
          <label htmlFor="updatedStatus" className="text-lg">
            Change status:
          </label>
          <input
            type="text"
            className="border-2 border-black rounded m-2"
            value={updatedStatus}
            onChange={(event) => {
              setUpdatedStatus(event.target.value);
            }}
          ></input>
          <button
            className="border-2 border-blue-500 rounded p-1 bg-black text-blue-500"
            type="submit"
          >
            Update
          </button>
        </form>
        <div className="uppercase font-bold">Order placed on:</div>
        <div className="font-bold">{orderTime.toLocaleString()}</div>
        <div className="flex-col text-center">
          <div className="text-xl mt-4">Purchased by: {order.name}</div>
          <div className="text-xl mb-4">{order.email}</div>
          {order.products &&
            order.products.map((product) => {
              return (
                <p key={product.id} className="font-bold">
                  {product.name} x {product.quantity} @ ${product.price}
                </p>
              );
            })}
          <p className="mt-4 text-xl text-blue-500 font-bold underline decoration-2">
            {" "}
            Order total: ${order.products && subtotal}
          </p>
        </div>
      </div>
    );
  }
}

export default AdminSingleOrder