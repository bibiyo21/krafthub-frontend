import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthenticationAPI from "../api/services/Authentication/AuthenticationService";
import UserServiceAPI from "../api/services/Users/UsersService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  Confirm = () => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  
  const logout = () => {
    AuthenticationAPI.logout().then(() => {
      window.location.replace("/");
    });
  };
  
  const AdminLogin = () => {
    
    const email = "admin@gmail.com";
    const password = "admin";
    
     AuthenticationAPI.login({
      email, password
    }).then((response) => {
          console.log(response);      
    }).catch(({ response }) => {
      logout();
    })
    
  };
    
    

  const onSubmit = ({ emailAdr }) => {
    
    AdminLogin();
    
    UserServiceAPI.updateUserValidity({
      id: emailAdr,
      status: "1",
    }).then((data) => {
      toast.success(data.message);
    })
    
    logout();
    
    
  };

  
  return (
      <section class="upcoming-meetings mt-5 py-5" id="meetings">
          <Form onSubmit={handleSubmit(AdminLogin , onSubmit)}>
              <h3>Confirm your email address</h3>

              <Form.Group className="mb-3">
                <input type="text" className="form-control" placeholder="Email" {...register("emailAdr")} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>

             <ToastContainer />
            </Form>
      </section>
  );
}

export default Confirm;
