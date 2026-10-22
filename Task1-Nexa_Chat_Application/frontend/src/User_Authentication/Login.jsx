import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
  console.log('login');
  e.preventDefault();
  try{
  if (!email) {
  alert("Please provide your email to continue.");
  return;
  }
  if (!password) {
  alert("Please provide your password to continue.");
  return;
  }
  const res = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
  },
  { withCredentials: true }
);
  window.location.href = "http://localhost:5174/";
  toast.success('login successful');
  
  toast.success("Welcome back to Nexa!");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
}


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
       <h2 style={{color:"#f97cf9"}}>Let’s Get You Connected</h2>

        <label style={{color:"#f97cf9"}}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{color:"#f97cf9"}}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
