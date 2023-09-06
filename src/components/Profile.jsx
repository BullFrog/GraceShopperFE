/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getUserOrders } from "../api/Orders";
import { getUserCart } from "../api/Cart";
import { useOutletContext } from "react-router-dom/dist";

const Profile = () => {
  // const [orders, setOrders] = useState([]);
  const { token } = useOutletContext();

  // async function getPreviousOrders() {
  //   try {
  //     const result = await getUserOrders(token);
  //       console.log(result)
  //     if (result) {
  //       setOrders(result);
  //     }
  //   } catch (error) {
  //     console.log("error getting previous orders", error);
  //   }
  // }

  const [cart,setCart] = useState([]);
  
  
  async function getUsersCart() {
    try {
      const result = await getUserCart(token);
      console.log(token)
        console.log(result)
      if (result) {
        setCart(result);
      }
    } catch (error) {
      console.log("error getting previous orders", error);
    }
  }

  useEffect(() => {
    // getPreviousOrders();
    getUsersCart();
  }, []);

  return (
    <div id="profile">
      <div id="ProfileHeader">
        <h1 className="ProfileTitle">My Profile</h1>
        <div className="UserCard">
          <h2 className="UserInfo">
            Name: <span className="Info"></span>
          </h2>
          <h3 className="UserInfo">
            Username: <span className="Info"></span>
          </h3>
          <h3 className="UserInfo">
            Email: <span className="Info"></span>
          </h3>
          {/* <Link to={`edit-profile/${user.id}`} state={user}>
            <button className="Button">Edit Username/Email</button>
          </Link> */}
        </div>
        <h1 className="OrdersTitle">My Orders</h1>
      </div>
      {/* <div>
        {orders.map((order, idx) => {
          return (
            <div className="OrderCard" key={"order idx:" + idx}>
              <h1 className="OrderNumber">
                Order <span className="Info">#{order.id}</span>
              </h1>
              {order.items.map((item, idx) => {
                return (
                  <div key={"item idx:" + idx}>
                    <h2 className="OrderInfo">
                      Item: <span className="Info">{item.product_name}</span>
                    </h2>
                    <h3 className="ItemInfo">
                      Size: <span className="Info">{item.product_size}</span>{" "}
                      Quantity: <span className="Info">{item.quantity}</span>{" "}
                      Color: <span className="Info">{item.product_color}</span>{" "}
                      Fragrance:{" "}
                      <span className="Info">{item.product_fragrance}</span>
                    </h3>
                  </div>
                );
              })}
              <h2 className="OrderInfo">
                Order Status: <span className="Info">{order.status}</span>
              </h2>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Profile;
