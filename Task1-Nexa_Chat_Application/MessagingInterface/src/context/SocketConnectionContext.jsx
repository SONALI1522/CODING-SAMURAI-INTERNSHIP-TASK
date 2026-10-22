import {createContext, useContext, useEffect, useState} from "react";
import {useAuth}  from "./useAuthUsers";
import io from "socket.io-client";
const socketContext = createContext();

export const useSocketContext = () =>{
  return useContext(socketContext);
}
export const SocketProvider = ({children})=>{
    const [socketConnection, setSocketConnection] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const {authUser} = useAuth();
     useEffect(() => {
        if (!authUser) return;

        const socket = io("http://localhost:3000", {
          withCredentials: true,
        });

        setSocketConnection(socket);

        socket.on("getonline", (users) => {
            setActiveUsers(users);
        });

        return () => {
            socket.close();
            setSocketConnection(null);
            setActiveUsers([]);
        };
    }, [authUser]);
    return(
        <socketContext.Provider 
          value={{socketConnection, activeUsers}}
          >
          {children}
        </socketContext.Provider>
    );
};