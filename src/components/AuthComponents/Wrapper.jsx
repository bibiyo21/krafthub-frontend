import React from "react";

const Wrapper = ({ children }) => {
  if (localStorage.getItem('token')) {
    window.location.replace("/home");
  }

  return (
    
    <div>
        <h2 class="text-left mb-3">
        <img class="_1-kh _93s6 img" src="../../images/logo.jpg" alt="LogoKH" />
            <ul class="_2fux">
                <li class="_4qfn"><a href="https://krafthub-live.web.app/AboutUs" class="_4vo5">About Us  </a>                                                           
                </li>
                <li class="_4qfn"><a href="https://krafthub-live.web.app/Privacy" class="_4vo5">Privacy Policy  </a>  
                </li>
                <li class="_4qfn"><a href="https://krafthub-live.web.app/Terms" class="_4vo5">Terms of use  </a> 
              </li>
            </ul>
        </h2>
<div className="auth-wrapper">
              <img class="_1-kj _93s6 img" src="../../images/TagLine.jpg" alt="TagLineKH" />
              <div className="auth-inner">
                {children}
              </div>

               <div className="auth-image">
                <form> 
                  <img src="../../images/Bg2.jpg" alt="kraftHub" width="300" height="400" />
                 </form>
              </div>

        </div>

      <footer class="_4sze" role="contentinfo" aria-label="Footer">
          <div class="_6ajd"><div class="_8v9m" style="max-width:1500px;">
            <div class="_8on8">
              <div class="_4tdp">
                <div class="_8vbh"><span class="_8vbg"> © KraftHub&nbsp;2022. </span>
            <span class="_6aje"> Krafthub is your one-stop booking hub for home improvement and maintenance services </span>
            <span class="_6aje"><div style="max-width: 150px; margin: 0 auto;">
                <img class="_6b6a img" alt="Krafthub" src="../../images/NameTag.jpg" width="161" alt="NameTagKH">
        </div></span></div></div></div></div></div>


  </footer>


    </div>
    
        
  );
};


export default Wrapper;
