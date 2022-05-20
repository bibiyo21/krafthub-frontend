import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Login from "./components/AuthComponents/Login";
import Terms from "./components/AuthComponents/Terms";
import Confirm from "./components/AuthComponents/Confirm";
import SignUp from "./components/AuthComponents/Signup";
import Home from "./components/Pages/Home";
import MyJob from './components/Profile/MyJob';
import Admin from './components/Admin';
import BookingManagement from './components/Admin/BookingManagement';
import NotFoundPage from './components/Pages/NotFoundPage';
import Profile from './components/Profile';
import ScheduledBooking from './components/Profile/ScheduledBooking';
import JobBooking from './components/Profile/JobBooking';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/job" element={<MyJob />} />
        <Route path="/bookings/jobs" element={<JobBooking />} />
        <Route path="/bookings/scheduled" element={<ScheduledBooking />} />
        <Route path="/admin/user-management" element={<Admin />} />
        <Route path="/admin/booking-management" element={<BookingManagement />} />
        <Route path="*" component={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
