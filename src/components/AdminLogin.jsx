// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { adminLogin } from "../api/Admin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setToken} = useOutletContext();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const admin = await adminLogin(username, password)
        if (admin) {
            console.log(admin)
            setToken(admin.token)
            alert(`${admin.message}`)
            navigate("/admin/products")
        }

    } catch (error) {
      console.error(error)
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
            Enter Username:
          </label>
          <input
            className="inputBox w-96 px-3 py-2 rounded-md border border-slate-400"
            type="text"
            name="username"
            value={username}
            placeholder="Enter Your Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
          <label className="inputLabels text-sm text-white font-light">
            Enter Password:
          </label>
          <input
            className="inputBox w-96 px-3 py-2 rounded-md border border-slate-400"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>

          <button className="inline-block rounded px-3 pb-2.5 pt-3 text-sm font-medium uppercase bg-blue-600 text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
