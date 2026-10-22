import React from "react";
import Left from "./Home/Left/left";
import Right from "./Home/Right/Right";
import "./App.css";
import AuthProvider from "./context/useAuthUsers.jsx";
import {SocketProvider} from "./context/SocketConnectionContext.jsx"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <AuthProvider>
      <SocketProvider>
      <div className="app">
        <div className="leftside">
          <Left />
        </div>
        <div className="rightside">
          <Right />
        </div>
      </div>
     </SocketProvider>
    </AuthProvider>
    <Toaster />
    </>
  );
}
export default App;
