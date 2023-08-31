// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { myData } from "../api/myData";

export default function Root() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [token, setToken] = useState("");
const [user, setUser] = useState({});
const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData);
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="w-full h-2">
      <nav className="bg-black text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-10 py-8 text-3xl">
            <NavLink
              to={`/Home`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              user={user}
              setToken={setToken}
            >
              Grace Shopper
            </NavLink>

            <div className=" flex items-center">
              <div className="mr-10">
                <Link
                  to={"/Home"}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  token={token}
                  user={user}
                  setToken={setToken}
                  className="text-white text-2xl mr-10"
                >
                  Home
                </Link>
                <Link to={"/Product"} className="text-white text-2xl mr-10">
                  Product
                </Link>
                <Link to={"/Cart"} className="text-white text-2xl mr-10">
                  Cart
                </Link>
                {isLoggedIn ? (
                  <>
                  <Link
                      to={"/Profile"}
                      className="text-white text-2xl mr-10"
                    >Profile
                    </Link>
                  <Link
                    to={"/Logout"}
                    setIsLoggedIn={setIsLoggedIn}
                    className="text-white text-2xl"
                  >
                    Logout
                  </Link>
                    </>
                ) : (
                  <>
                    <Link
                      to={"/Register"}
                      setIsLoggedIn={setIsLoggedIn}
                      setToken={setToken}
                      className="text-white text-2xl mr-10"
                    >
                      Register
                    </Link>

                    <Link
                      to={"/Login"}
                      setIsLoggedIn={setIsLoggedIn}
                      setToken={setToken}
                      className="text-white text-2xl mr-10"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet
        context={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          cart,
          setCart
        }}
      />
    </div>
  );
}
