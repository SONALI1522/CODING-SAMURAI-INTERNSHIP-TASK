import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogIn = () =>{
    console.log('handlelogin cliked');
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    console.log('signup');
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", 
        {
        email,
        password,
        username,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      toast.success("Welcome to Nexa! Your account has been created successfully.🎉");
      window.location.href = "http://localhost:5174/";
    } catch (err) {
     if (err.response && err.response.status === 409) {
       alert(err.response.data.message);
     } else {
       toast.error("Signup failed");
     }
    }
  };

  return (
    <>
    <form style={{border: "2px solid #7C148F"}} className="signup-form" onSubmit={handleSubmit}>
      <div>
        <label style={{color:"#7C148F"}}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={{color:"#7C148F"}}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={{color:"#7C148F"}}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        style={{ backgroundColor: "#E8B1F2", color: "#7C148F", border: "2px solid #7C148F" }}
        type="submit"
      >
       Signup
      </button>
    </form>
    
    <div className="text-center">
      <p style={{color:"#7C148F"}}>Have an account?</p>
      <button 
       style={{ backgroundColor: "#E8B1F2", color: "#7C148F", border: "2px solid #7C148F" }}
       onClick={handleLogIn}
      >Login</button>
    </div>
  </>
  )
};

export default Signup;
