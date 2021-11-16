import React from 'react';
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthenticationAPI from '../api/services/Authentication/AuthenticationService';

const  Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ email, password }) => {
    AuthenticationAPI.login({
      email, password
    })
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>

      <Form.Group className="mb-3">
        <input type="text" className="form-control" placeholder="Enter email" {...register("email", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <input type="password" className="form-control" placeholder="Password" {...register("password", { required: true })} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p className="forgot-password text-right">
        Don't have an account yet? <Link to={"/sign-up"}>Register here</Link>
      </p>
    </Form>
  );
}

export default Login;