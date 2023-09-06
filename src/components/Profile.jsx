/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { getUserOrders } from "../api/Orders";

const Profile = () => {
  const {user, token} = useOutletContext();
  const [order, setOrder] = useState([]);
  
  async function getPreviousOrders() {
    try {
      const result = await getUserOrders(token);
      console.log(result)
      if (result) {
        setOrder(result);
      }
    } catch (error) {
      console.log("error getting previous orders", error);
    }
  }
  useEffect(() => {
    getPreviousOrders();
  }, []);
  
  return (
    <div
      className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-t from-black to-grey-700 overflow-y-scroll"
    >
      <div className="p-10 bg-black rounded-xl drop-shadow-lg space-y-5 text-white">
        <h1 className="text-3xl text-center pb-3">My Profile</h1>
        <div>
          <h2 className="w-96 px-3 py-2 rounded-md border border-slate-400">
            <span className="underline decoration-1">Name: </span>
            <span className="pl-2">{user.name}</span>
          </h2>
          <h2 className="w-96 px-3 py-2 rounded-md border border-slate-400">
            <span className="underline decoration-1">Email: </span>
            <span className="pl-2">{user.email}</span>
          </h2>
          <h2 className="w-96 px-3 py-2 rounded-md border border-slate-400">
            <span className="underline decoration-1">Address: </span>
            <span className="pl-2">{user.address}</span>
          </h2>
        </div>
        <Link
          to={`/admin/orders`}
          className="inline-block rounded-3xl px-3 pb-2.5 pt-3 text-sm font-light uppercase bg-blue-600"
        >
          My Orders
        </Link>
        <Link
          to={`/Cart`}
          className="inline-block rounded-3xl px-3 pb-2.5 pt-3 text-sm font-light uppercase bg-blue-600 float-right"
        >
          My Cart
        </Link>
        <div className="underline text-4xl text-center m-4">All orders</div>
        {order.length &&
          order.map((order) => {
            let date = order.orderDate;
            let orderTime = new Date(date);
            return (
              <div key={order.id} className="m-6">
                <h3>
                  Order #{order.id}: {orderTime.toLocaleString()}
                </h3>
                <p>{order.status}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
