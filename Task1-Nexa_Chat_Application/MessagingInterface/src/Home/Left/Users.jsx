import React from "react";
import User from "./user";
import "./Left.css";
import Sidebar from "../../Hooks/Sidebar.jsx";
function Users() {
  const [allUsers, loading] = Sidebar();
  return (
    <>
    <h1 className="usersonsidebar">Users</h1>
    <div>
      {allUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
    </>
  )
}
export default Users;