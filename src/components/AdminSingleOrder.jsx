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
      <>
        <div className="text-4xl m-4">Order #{order.id}</div>
        <div className="text-2xl ml-4">Status: {order.status}</div>
        <form className="m-4" onSubmit={handleSubmit}>
          <label htmlFor="updatedStatus" className="">
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
          <button className="border-2 border-black rounded p-1" type="submit">
            update
          </button>
        </form>
        <div className="ml-4">Order placed on:</div>
        <div className="ml-4">{orderTime.toLocaleString()}</div>
        <div className="flex-col text-center">
          <div className="text-xl">Purchased by: {order.name}</div>
          <div className="text-xl m-2">{order.email}</div>
          {order.products &&
            order.products.map((product) => {
              return (
                <p key={product.id}>
                  {product.name} x {product.quantity} @ ${product.price}
                </p>
              );
            })}
          <p className="mt-2"> Order total: ${order.products && subtotal}</p>
        </div>
      </>
    );
          }
}

export default AdminSingleOrder