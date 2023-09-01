import { createProduct } from "../api/Admin";
import { useState } from "react";

const AdminNewProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    price: "",
    inventory: "",
  })

  return (
    <form>
        <label>New Product Form:</label>
        <input placeholder="new product"></input>
    </form>
  )
};

export default AdminNewProductForm;
