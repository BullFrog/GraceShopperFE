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
    <>
      <AdminNavbar setToken={setToken}/>
      <div className="underline text-4xl text-center m-4">All orders</div>
      {orders.length && orders.map((order) => {
        let date = order.orderDate
        let orderTime = new Date(date)
        return (
          <div key={order.id} className="m-6">
            <h3>
              Order #{order.id}: {orderTime.toLocaleString()}
            </h3>
            <p>{order.status}</p>
            <Link to={`/admin/orders/${order.id}`} className="underline">view order&gt;</Link>
          </div>
        );
      })}
    </>
  );
};

export default AdminOrders;
