import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthenticationAPI from '../../api/services/Authentication/AuthenticationService';
import UserServiceAPI from "../../api/services/Users/UsersService";
import Wrapper from './Wrapper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  Confirm = () => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
     
    

  const onSubmit = ({ email }) => {
    UserServiceAPI.updateUserValidityCon({
      id: email,
      status: "1",
    }).then((data) => {
      toast.success(data.message);
    })
    
    logout();
    
    
  };

  
  return (
    <Wrapper >
      <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Confirm your email address</h3>

          <Form.Group className="mb-3">
            <input type="text" className="form-control" placeholder="Email" {...register("email")} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

         <ToastContainer />
        </Form>
    </Wrapper>
  );
}

export default Confirm;
