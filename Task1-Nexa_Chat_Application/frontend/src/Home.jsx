import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
function HomePage() {
  const navigate = useNavigate();

  return (
  <div className="container">
    <img 
      src="/images/Logo.png"
      alt="Nexa Logo"
      className="nexa-logo"
    />
     <h1 className="mb-5" style={{ color: '#5b25fd'}}>NEXA</h1>
    <div className="row text-center"> 
  
      <div className="d-flex flex-column">
        {/* Hero Section */}
        <p className="display-4 fw-bold">
          Connect in Real Time with <span style={{ color: '#3108ad' }}>NEXA</span>
        </p>

        <p className="lead mt-3" style={{ color: '#623bef'}}>
          Connect, chat, and share in real time
        </p>
        <button
          className="signup-button"
          onClick={() => navigate("/signup")}
          style={{ backgroundColor: '#3f17b6', color: 'white' }}
        >
         Join NEXA
        </button>
        <br/>
        <button
          className="login-button"
          onClick={() => navigate("/login")}
          style={{ backgroundColor: '#6f4cda', color: 'white' }}
        >
          Welcome Back
        </button>
      </div>
    </div>
    <div>
      <img 
         style={{width:"800px", height:"300px", marginTop:"50px"}}
         src="/video/online-video-chat.gif"
         alt="image"
         className="online-video"
        />
    </div>
  </div>       
  );
}

export default HomePage;
