import React from "react";
import { CgLogOut } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Logout() {
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      setLoading(false);
      toast.success("Logout successful!");
      window.location.href = "http://localhost:5173/";
    } catch (err) {
      toast.error("Logout failed", err);
    }
  };
    return (
        <>
         <div className="logouticon" onClick={handleLogout}>
          <CgLogOut/>
         </div>
        </>
    );
}    
export default Logout;