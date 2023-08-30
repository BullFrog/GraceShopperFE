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
  const { token, setToken } = useOutletContext();
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
      setToken(newUserToken.token);
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
    <div
      className="loginContainer w-screen h-screen flex justify-center items-center
    bg-gradient-to-t from-black to-grey-700"
      id="registerBox"
    >
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-black rounded-xl drop-shadow-lg space-y-5"
      >
        <h1 className="text-xl text-white text-center">Sign Up for an Account</h1>
        <div className="loginBox flex flex-col space-y-2">
          <label className="inputLabels text-sm text-white font-light">
            Enter Your Name:
          </label>
          <input
            className="inputBox w-96 px-3 py-2 rounded-md border border-slate-400"
            placeholder="Enter Your Name"
            type="text"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <label className="inputLabels text-sm text-white font-light">
            Enter Email:
          </label>
          <input
            className="inputBox w-96 px-3 py-2 rounded-md border border-slate-400"
            type="text"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <label className="inputLabels text-sm text-white font-light">
            Create Password:
          </label>
          <input
            className="inputBox w-96 px-3 py-2 rounded-md border border-slate-400"
            placeholder="8 Characters Minimum"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <p>{errorMessage}</p>
          <button className="inline-block rounded px-3 pb-2.5 pt-3 text-sm font-medium uppercase bg-blue-600 text-white">
            CREATE ACCOUNT
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
