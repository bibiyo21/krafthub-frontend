import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import AuthenticationAPI from '../../api/services/Authentication/AuthenticationService';
import Wrapper from './Wrapper';

const  Signup = () => {
  const { 
    register, 
    handleSubmit, 
  } = useForm();

  const [errors, setErrors] = useState(null);

  const onRegister = ({ 
    first_name, 
    last_name, 
    email,
    password,
    password_confirmation,
    cellphone_number,
    house_info,
    zipcode, 
    agreement
  }) => {
    AuthenticationAPI.register({ 
      first_name, 
      last_name, 
      email,
      password,
      password_confirmation,
      cellphone_number,
      house_info,
      zipcode,
      agreement
    }).then((response) => {
      window.location.replace("/home");
    }).catch(({ response }) => {
      if (response?.data?.errors !== undefined) {
        setErrors(response?.data?.errors)
      }
    })
  };

  useEffect(() => {
    console.log({errors})
  }, [errors]);
  
  return (
    <Wrapper >
      <Form onSubmit={handleSubmit(onRegister)}>
        <h3>Sign Up</h3>
        <Form.Group className="mb-3">
          <input type="text" className="form-control" placeholder="First Name" {...register("first_name", { required: true })} />
          {errors?.first_name !== undefined && <p className="text-danger">{errors.first_name[0]}</p>}

        </Form.Group>

        <Form.Group className="mb-3">
          <input type="text" className="form-control" placeholder="Last Name" {...register("last_name", { required: true })} />
          {errors?.last_name !== undefined && <p className="text-danger">{errors.last_name[0]}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="text" className="form-control" placeholder="Email" {...register("email", { required: true })} />
          {errors?.email !== undefined && <p className="text-danger">{errors.email[0]}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="15" className="form-control" defaultCountry="PH" placeholder="Mobile Number - 639XX-XXXX-XXX" {...register("cellphone_number", { required: true })} />
          {errors?.cellphone_number !== undefined && <p className="text-danger">{errors.cellphone_number[0]}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="password" className="form-control" placeholder="Password" {...register("password", { required: true })} />
          {errors?.password !== undefined && <p className="text-danger">{errors.password[0]}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Confirm Password" {...register("password_confirmation", { required: true })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="text" className="form-control" placeholder="Address" {...register("house_info", { required: true })} />
          {errors?.house_info !== undefined && <p className="text-danger">{errors.house_info[0]}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="text" className="form-control" placeholder="Zip Code" {...register("zipcode", { required: true })} />
          {errors?.zipcode !== undefined && <p className="text-danger">{errors.zipcode[0]}</p>}
        </Form.Group>

        <div class="form-check">
          <input type="checkbox" class="form-check-input" {...register("agreement")} />
          <label class="form-check-label">
            I agree to the KraftHub User Agreement and Privacy Policy
          </label>
          {errors?.agreement !== undefined && <p className="text-danger">{errors.agreement[0]}</p>}

        </div>

        <Button size="lg" variant="primary" type="submit" className="mt-3">
          Register
        </Button>
        <p className="forgot-password text-right">
          Already registered <Link to={"/login"}>Sign In</Link>
        </p>
      </Form>
    </Wrapper>
    
  );
}

export default Signup;
