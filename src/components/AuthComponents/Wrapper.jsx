import React from "react";
import logoImg from '../../images/logo.jpg';
import tagLineImg from '../../images/TagLine.jpg';
import nameImg from '../../images/NameTag.jpg';
import bg2Img from '../../images/Bg2.jpg';

const Wrapper = ({ children }) => {
  if (localStorage.getItem('token')) {
    window.location.replace("/home");
  }

  return (
    
    <div>
        <h2 class="text-left mb-3">
          <img class="_1-kh _93s6 img" src={logoImg} alt="LogoKH" />
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
              <div className="auth-inner">
                {children}
              </div>

               <div className="auth-image">
                <form> 
                  <img src={bg2Img} alt="kraftHub" width="300" height="400" />
                 </form>
              </div>

        </div>

      <footer aria-label="Footer">
                    <span class="_8vbg"> © KraftHub&nbsp;2022. </span>
                    <span class="_6aje"> Krafthub is your one-stop booking hub for home improvement and maintenance services </span>
                    <span class="_6aje">
                       <div>
                          <img class="_6b6a img" alt="Krafthub" src={nameImg} width="161" alt="NameTagKH" />
                       </div>
                    </span>
  
    </footer>


    </div>
    
        
  );
};


export default Wrapper;
