// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { myData } from "../api/myData";
import AdminNavbar from "../components/AdminNavbar";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [order] = useState([]);

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
      {admin ? (
        <AdminNavbar setToken={setToken} setAdmin={setAdmin} />
      ) : (
        <nav className="bg-black text-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between px-10 py-8 text-3xl">
              <NavLink
                to={`/`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Empire Gaming
              </NavLink>

              <div className=" flex items-center">
                <div className="mr-10">
                  <Link to={"/"} className="text-white text-2xl mr-10">
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
                      >
                        Profile
                      </Link>
                      <Link to={"/Logout"} className="text-white text-2xl">
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={"/Register"}
                        className="text-white text-2xl mr-10"
                      >
                        Register
                      </Link>

                      <Link to={"/Login"} className="text-white text-2xl mr-10">
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <Outlet
        context={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          cart,
          setCart,
          admin,
          setAdmin,
        }}
      />
      <body className=" bg-black h-52 text-white flex place-content-center underline decoration-1">
        <Link to={`/Profile`} className="mt-7">Account</Link>
        <Link to={"/admin/login"} className="ml-80 mt-7">
          Admin Login
        </Link>
        <Link to={`/Profile`} className="ml-80 mt-7">Orders</Link>
      </body>
    </div>
  );
}
