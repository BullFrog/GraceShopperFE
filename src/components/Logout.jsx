import  { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  useEffect(() => {
    setIsLoggedIn(false);
    navigate("/Home");
  });
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("cart");
};
export default Logout;
