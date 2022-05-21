import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Wrapper from './Wrapper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import privPdf from '../../images/KraftHub-Privacy-Policy_CHECKED-CJM-EJC.pdf';

const  Privacy = () => {
 
  
  return (
    <Wrapper >
       <section class="upcoming-meetings mt-5 py-5" id="meetings">
        <div class="container">
           <p className="forgot-password text-right">
              <Link to={"/login"}>Go Back to Login page ... </Link>
          </p>
          <iframe src={privPdf} width={600} height={500}>
          </iframe>      

          
        </div>
      </section>
    
        
         <ToastContainer />
    </Wrapper>
  );
}

export default Privacy;
