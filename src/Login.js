import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import Home from "./Home";
import './css/Login.css';

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  return (
    <div className="log">

        <div className="container-fluid">
          
            <LoginSocialFacebook
              appId="1129719461759606"
              onResolve={(res) => {
                console.log(res);
                setUser(res.data);
                navigate("/home");
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <div className="fblogin">

              
              <FacebookLoginButton className="button" style={{ width: "350px", border: "3px solid white" }} />
              
              <br/>
              <br/>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path title="Facebook Login"  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg><br/><br/>

              <button className="fbbtn">
              <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="50" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
              &nbsp;&nbsp;<span className="fspan">Login with <br/>Facebook</span>
              </button>
              </div>
            </LoginSocialFacebook>
          
        </div>
        
    </div>
  );
};

export default Login;
