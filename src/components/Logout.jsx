import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();
  const { setToken } = useOutletContext();
  const [ setName ] = useState("");
  const [ setEmail ] = useState("");
  const [ setPassword ] = useState("");
  const [ setErrorMessage ] = useState("");

  useEffect(() => {
    setIsLoggedIn(false);
    setToken("");
    setName;
    setEmail;
    setPassword;
    setErrorMessage;
    navigate("/");
  });
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("cart");
};
export default Logout;
