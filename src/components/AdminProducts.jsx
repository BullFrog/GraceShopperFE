import { useState, useEffect } from "react";
import AdminNewProductForm from "./AdminNewProductForm";
import { getAdminProducts } from "../api/Admin";
import AdminNavbar from "./AdminNavbar";

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  return (
    <>
    <AdminNewProductForm />
    <p>admin products page</p>
    </>
  )
};

export default AdminProducts;
