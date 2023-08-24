import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedIn(false);
    navigate("/Login");
  });
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  return <div></div>;
};
export default Logout;
