import React from "react";

const Wrapper = ({ children }) => {
  if (localStorage.getItem('token')) {
    window.location.replace("/home");
  }

  return (
    <div className="auth-wrapper">
      <h2 className="text-center mb-3">KraftHub</h2>
      <div className="auth-inner">
        {children}
      </div>
       <div className="auth-image">
        <form> 
          <img src="../../images/Bg2.webp" alt="kraftHub" width="300" height="400">
         </form>
      </div>
    </div>
  );
};


export default Wrapper;
