import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Login from "./components/AuthComponents/Login";
import SignUp from "./components/AuthComponents/Signup";
import Home from "./components/Home";
import MyJob from './components/MyJob';
import NotFoundPage from './components/NotFoundPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-job" element={<MyJob />} />
        <Route path="*" component={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;