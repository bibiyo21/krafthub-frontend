import React, { useState } from 'react';
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
    UserServiceAPI.updateUserValidity({
      id: email,
      status: "1",
    }).then((data) => {
      toast.success(data.message);
    })
    
    
  };

  return (
    <Wrapper >
      <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Confirm your email address</h3>

          {
            show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <p>
                Login Failed! Email Address and Password does not match
              </p>
            </Alert>
          }
          

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

export default Login;
