import React, {useState} from "react";
import { IoSearchCircle } from "react-icons/io5";
import Sidebar from "../../Hooks/Sidebar.jsx";
import useChat from "../../manageState/useChat.js";
function Find() {
  const [search, setSearch] = useState("");
  const [allUsers, loading] = Sidebar();
  const {setSelectedChat} = useChat();
      const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        const chatData = allUsers.find((user) => {
          return user.username
          .toLowerCase()
          .includes(search.toLowerCase());
        });

        if (chatData) {
            setSelectedChat(chatData);
            setSearch("");
        } else {
            alert("User account not found");
        }
  };
  return (
    <>
    <div style={{marginTop: "10px"}}>
     <nav class="navbar " style={{borderRadius: "50px", backgroundColor: "#E681FA"}}>
      <div class="container-fluid" style={{backgroundColor: "#E681FA"}}>
       <form onSubmit={handleSubmitForm}
         className="d-flex" 
         role="search"
        >
       <input 
         class="form-control me-2" 
         type="search" 
         placeholder="Search users" 
         aria-label="Search"
         value={search}
         onChange={(e) => 
          setSearch(e.target.value)
         }
        />
       <button class="btn" type="submit"><IoSearchCircle style={{fontSize: "2rem"}}/></button>
       </form>
     </div>
     </nav>
    </div>
    </>
  )
}
export default Find;