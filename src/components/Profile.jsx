/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const [order] = useState([]);
  const {user} = useOutletContext();

  return (
    <div
      className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-t from-black to-grey-700"
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
          to={`/admin/orders/${order.id}`}
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
      </div>
    </div>
  );
};

export default Profile;
