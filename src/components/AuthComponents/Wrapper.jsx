import React from "react";

const Wrapper = ({ children }) => {
  if (localStorage.getItem('token')) {
    window.location.replace("/home");
  }

  return (
    
    <div>
        <h2 class="text-left mb-3">
        <img class="_1-kh _93s6 img" src="../../images/NameTag.webp" />
            <ul class="_2fux">
                <li class="_4qfn"><a href="https://krafthub-live.web.app/AboutUs" class="_4vo5">About Us  </a>                                                           
                </li>
                <li class="_4qfn"><a href="https://krafthub-live.web.app/Privacy" class="_4vo5">Privacy Policy  </a>  
                </li>
                <li class="_4qfn"><a href="https://krafthub-live.web.app/Terms" class="_4vo5">Terms of use  </a> 
              </li>
            </ul>
        </h2>
    </div>
    
        <div className="auth-wrapper">

              <div className="auth-inner">
                {children}
              </div>

               <div className="auth-image">
                <form> 
                  <img src="../../images/Bg2.webp" alt="kraftHub" width="300" height="400" />
                 </form>
              </div>

        </div>
  );
};


export default Wrapper;
