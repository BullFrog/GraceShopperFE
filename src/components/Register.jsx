// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { RegisterPerson } from "../api/Register";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
// eslint-disable-next-line no-unused-vars
const {token, setToken} = useOutletContext();
const { setIsLoggedIn } = useOutletContext();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const NewUser = {
        email: email,
        name: name,
        password: password,
      };
      const newUserToken = await RegisterPerson(NewUser);
      if (newUserToken.error) {
        throw new Error(newUserToken.message);
      }
      setToken(newUserToken);
      localStorage.setItem("The Goods", newUserToken.token);
      setIsLoggedIn(true);
      if (newUserToken) {
        navigate("/Login");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <div className="loginContainer" id="registerBox">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up for an Account</h1>
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
          <label className="inputLabels">Create Password:</label>
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
          <label className="inputLabels">Enter Your Name:</label>
          <input
            className="inputBox"
            placeholder="Enter Your Name"
            type="text"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <p>{errorMessage}</p>
          <button>CREATE ACCOUNT</button>
        </div>
      </form>
    </div>
  );
};
export default Register;
