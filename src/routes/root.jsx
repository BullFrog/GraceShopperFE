import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import SidebarCart from "../components/SidebarCart"

export default function Root() {
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
              >
                Grace Shopper
              </NavLink>
              <div className=" flex items-center">
                <div className="mr-10">
                  <Link to={"/Home"} className="text-white text-2xl mr-10">
                    Home
                  </Link>
                  <Link to={"/Product"} className="text-white text-2xl mr-10">
                    Product
                  </Link>
                  <Link to={"/Cart"} className="text-white text-2xl mr-10">
                    Cart
                  </Link>
                  <Link to={"/Register"} className="text-white text-2xl mr-10">
                    Register
                  </Link>
                  <Link to={"/Login"} className="text-white text-2xl mr-10">
                    Login
                  </Link>
                  <Link to={"/Logout"} className="text-white text-2xl">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex">
          <SidebarCart />
          <Outlet />
        </div>
      </div>
  );
}
