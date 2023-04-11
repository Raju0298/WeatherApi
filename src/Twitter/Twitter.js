import React, { Component } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

class TwitterButton extends Component {
  handleTwitterLogin = () => {
    const consumerKey = "aDVyR2s1eDZKa1ZMYTRLMldUeVo6MTpjaQ";
    const consumerSecret = "3A52-9fw4M_XmtgWjt1JnlfB-s-EfxWmyAlVDAPtk10-SS4H8j";
    const callbackUrl = "https://localhost:3000/profile";

    axios({
      method: "POST",
      url: "https://api.twitter.com/oauth/request_token",
      mode: "no-cors",
      withCredentials: "true",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `OAuth oauth_callback="${encodeURIComponent(
          callbackUrl
        )}", 
        oauth_consumer_key="${encodeURIComponent(
          consumerKey
        )}", 
        oauth_nonce="${encodeURIComponent(
          Math.random()
            .toString(36)
            .replace(/[^a-z]/gi, "")
        )}", 
        oauth_signature="${encodeURIComponent(
          this.getOAuthSignature(
            "POST",
            "https://api.twitter.com/oauth/request_token",
            {
              oauth_callback: callbackUrl,
              oauth_consumer_key: consumerKey,
              oauth_nonce: Math.random()
                .toString(36)
                .replace(/[^a-z]/gi, ""),
              oauth_signature_method: "HMAC-SHA256",
              oauth_timestamp: Math.floor(Date.now() / 1000),
              oauth_version: "1.0",
            },
            consumerSecret
          )
        )}", oauth_signature_method="HMAC-SHA256", oauth_timestamp="${encodeURIComponent(
          Math.floor(Date.now() / 1000)
        )}", oauth_version="1.0"`,
      },
    })
      .then((response) => {
        const data = new URLSearchParams(response.data);
        const oauthToken = data.get("oauth_token");
        const oauthTokenSecret = data.get("oauth_token_secret");

        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getOAuthSignature = (method, url, params, consumerSecret) => {
    const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(
      url
    )}&${encodeURIComponent(
      Object.entries(params)
        .sort()
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    )}`;

    const signingKey = `${encodeURIComponent(consumerSecret)}&`;
    const hmac = CryptoJS.HmacSHA256(signatureBaseString, signingKey);

    return hmac.toString(CryptoJS.enc.Base64);
  };

  render() {
    return (
      <button onClick={this.handleTwitterLogin}>Login with Twitter</button>
    );
  }
}

export default TwitterButton;
