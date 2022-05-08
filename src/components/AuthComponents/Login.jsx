import React, { useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthenticationAPI from '../../api/services/Authentication/AuthenticationService';
import Wrapper from './Wrapper';

const  Login = () => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = ({ email, password }) => {
    AuthenticationAPI.login({
      email, password
    }).then((response) => {
      window.location.replace("/home");
    }).catch(({ response }) => {
      if (response?.data?.errors !== undefined) {
        setShow(true);
        toast.warning(response?.data?.message);
      }
    })
  };

  return (
    <Wrapper >
      <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign In</h3>

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

          <Form.Group className="mb-3">
            <input type="password" className="form-control" placeholder="Password" {...register("password")} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <p className="forgot-password text-right">
            Don't have an account yet? <Link to={"/register"}>Register here</Link>
          </p>
        </Form>
    </Wrapper>
  );
}

export default Login;
