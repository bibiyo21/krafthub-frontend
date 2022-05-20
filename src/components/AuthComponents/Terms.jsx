import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Wrapper from './Wrapper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  Terms = () => {
 
  
  return (
    <Wrapper >
      <Form >
    
          <p className="forgot-password text-right">
              <Link to={"/login"}>Go Back to Login page ... </Link>
          </p>

          
         <ToastContainer />
        </Form>
    </Wrapper>
  );
}

export default Terms;
