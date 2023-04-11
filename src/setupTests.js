// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';


const fbScript = document.createElement('script')
fbScript.id = 'facebook-jssdk'
const fbid = process.env.REACT_APP_FACEBOOKID
window.fbAsyncInit = function() {
    window.fbLoaded = true
    window.FB.init({
        appId: fbid,
        cookie: false, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v16.0", // Use this Graph API version for this call.
      });

    window.FB.AppEvents.logPageView();
  };
document.body.appendChild(fbScript)
