import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Home';
import Signup from './User_Authentication/Signup';
import Login  from './User_Authentication/Login';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    <Toaster />
    </>
  )
}

export default App
