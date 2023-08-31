// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LoginPerson } from "../api/Login";
import { useState } from "react";
import { getUserCart } from "../api/Cart"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
const { setIsLoggedIn, setCart, token, setToken } = useOutletContext();

    const getCart = async (token) => {
      const userCart = await getUserCart(token);
      setCart(userCart);
    };

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

      setToken(newUserToken.token);
      localStorage.setItem("token", newUserToken.token);
      localStorage.setItem("email", NewUser.email)
      setIsLoggedIn(true);
      getCart(newUserToken.token);
      if (newUserToken) {
        navigate("/Home");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    
  }

  return (
    <div
      className="loginContainer w-screen h-screen flex justify-center items-center
    bg-gradient-to-t from-black to-grey-700"
    >
      <form
        className="p-10 bg-black rounded-xl drop-shadow-lg space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-white text-center">Login</h1>
        <div className="loginBox flex flex-col space-y-2">
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
            Enter Password:
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
