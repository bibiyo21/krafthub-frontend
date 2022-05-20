import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Wrapper from './Wrapper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import privPdf from '../../images/KraftHub-Terms-of-Use_CHECKED-CJM-EJC.pdf';

const  Terms = () => {
 
  
  return (
    <Wrapper >
      <Form >
    
          <p className="forgot-password text-right">
              <Link to={"/login"}>Go Back to Login page ... </Link>
          </p>
         <iframe src={privPdf}>
         </iframe>    
          
         <ToastContainer />
        </Form>
    </Wrapper>
  );
}

export default Terms;
