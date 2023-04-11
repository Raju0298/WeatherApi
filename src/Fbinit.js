// import React from "react";
// import { useState } from "react";
// import './Login.css'

// const Fbinit = () => {

//   const [fbtn, setfbtn] = useState(true)
//   // (function (d, s, id) {
//   //   var js, fjs = d.getElementsByTagName(s)[0];
//   //   if (d.getElementById(id)) return;
//   //   js = d.createElement(s);
//   //   js.id = id;
//   //   js.src = "//connect.facebook.net/en_US/sdk.js";
//   //   fjs.parentNode.insertBefore(js, fjs);
//   // })(document, "script", "facebook-jssdk");

//   window.fbAsyncInit = function () {
//     window.FB.init({
//       appId: "1129719461759606",
//       cookie: true, // Enable cookies to allow the server to access the session.
//       xfbml: true, // Parse social plugins on this webpage.
//       version: "{api-version}", // Use this Graph API version for this call.
//     });
//   };

//    const loginbtn = () => {
//     window.FB.getLoginStatus(function (res){
//       console.log(res)
//       statusChangeCallback(res)
//     })
//    }

//    const statusChangeCallback=(res)=>{
//       if(res.status==='connected'){
//         setfbtn("false")
//         facebookUserProfile()
//       }
//       else{
//         facebookLoginByDialog()
//       }
//    }

//    const facebookUserProfile=()=>{
//     window.FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
//     function (response) {
//         document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
//         document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
//         document.getElementById('status').innerHTML = '<p>Thanks for logging in, ' + response.first_name + '!</p>';
//         document.getElementById('userData').innerHTML = '<h2>Facebook Profile Details</h2><p><img src="'+response.picture.data.url+'"/></p><p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';

//         // Show user data
//         console.log(response);
//     });
//    }

//    const facebookLoginByDialog=()=>{
//     window.FB.login(function(res){
//       statusChangeCallback(res)
//     }, {scope: 'public_profile_email'})
//    }

//   return (
//     <div className="fbinit">

//       {/* <!-- Display login status --> */}
//       <div id="status"></div>

//       {/* <!-- Facebook login or logout button --> */}

//       <button className="fbtn" id="fbLink" onClick={loginbtn}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="40"
//           height="50"
//           viewBox="0 0 448 512">
//           <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
//         </svg>
//         &nbsp;&nbsp;
//         <span className="fspan">
//           Login with <br />
//           Facebook
//         </span>

//       </button>

//         {/* <!-- Display user's profile info --> */}
//         <div class="ac-data" id="userData"></div>

//       {/* <button className="fbbtn" style={{"visibility": fbtn===true? 'hidden': 'visible'}}>Logout</button> */}
//     </div>
//   );
// };

// export default Fbinit;

import React, { useState, useEffect } from "react";

const Fbinit = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const fbid = process.env.REACT_APP_FACEBOOKID
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: fbid,
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          // User is logged in and authorized the app
          window.FB.api("/me", { fields: "id,name,email" }, (response) => {
            setUser(response);
          });
        } else {
          // User cancelled login or did not fully authorize the app
          setUser(null);
        }
      },
      { scope: "email" }
    );
  };

  const handleLogout=() => {
    window.FB.logout(function(response) {
    // handle the response
    setUser(null);
    });
    }
    
    const checkLoginStatus = () => {
    window.FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
    handleLogout();
    }
    });
    }
    
    const LogoutButton = () => {
    useEffect(() => {
    checkLoginStatus();
    }, []);
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name} !</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Please log in to continue.</p>
          <button onClick={handleLogin}>Log In with Facebook</button>
        </div>
      )}
    </div>
  );
};

export default Fbinit;
