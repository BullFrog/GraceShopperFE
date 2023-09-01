import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = ({setToken}) => {
    const navigate = useNavigate();
    return (
      <div className="flex justify-around bg-black text-white text-3xl p-10">
        <Link to={"/admin/products"}>Products</Link>
        <Link to={"/admin/orders"}>Orders</Link>
        <button onClick={() =>{
            setToken("")
            navigate("/")
        }}>Logout</button>
      </div>
    );
}

export default AdminNavbar