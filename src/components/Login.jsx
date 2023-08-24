// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginPerson } from "../api/Login";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ setToken, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const NewUser = {
        email: email,
        password: password,
      };
      const newUserToken = await LoginPerson(NewUser);
      if (newUserToken.error) {
        throw new Error(newUserToken.message);
      }

      setToken(newUserToken);
      localStorage.setItem("THe Goods", newUserToken.token);
      setIsLoggedIn(true);
      if (newUserToken) {
        navigate.push("/");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="loginBox">
          <label className="inputLabels">Enter Email:</label>
          <input
            className="inputBox"
            type="text"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <label className="inputLabels">Enter Password:</label>
          <input
            className="inputBox"
            placeholder="8 Characters Minimum"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>

          <p>{errorMessage}</p>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
