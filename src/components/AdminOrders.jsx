/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getAdminOrders } from "../api/Admin";
import { useOutletContext, Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token, setToken } = useOutletContext();
  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      const allOrders = await getAdminOrders(token)
      setOrders(allOrders)
      console.log(allOrders)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-black h-screen border-2 rounded-3xl">
      <div className="underline text-4xl text-center text-white m-6">All orders</div>
      <div className="flex flex-wrap m-10">
      {orders.length && orders.map((order) => {
        let date = order.orderDate
        let orderTime = new Date(date)
        return (
          <div key={order.id} className="m-8 text-white border rounded p-2">
            <h3 className="">
              Order #{order.id}: {orderTime.toLocaleString()}
            </h3>
            <p className="uppercase">{order.status}</p>
            <Link to={`/admin/orders/${order.id}`} className="underline">view order&gt;</Link>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default AdminOrders;
