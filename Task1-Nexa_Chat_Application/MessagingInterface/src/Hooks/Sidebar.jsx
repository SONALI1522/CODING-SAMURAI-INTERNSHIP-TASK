import React, {useState,useEffect} from "react";
import axios from "axios";
function Sidebar(){
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        const loadUsers = async () =>{
            setLoading(true);
            try{
                const response = await axios.get(
                    "http://localhost:3000/user/user_profile",
                    {
                    withCredentials: true,
                    }
                );
                setAllUsers(response.data);
                setLoading(false);
            }catch (error){
              console.log("error in sidebar"+error);
            }
        };
        loadUsers()
    }, []);
    return [allUsers, loading];
};

export default Sidebar;