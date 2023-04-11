import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { ResponseContext } from "./MyRoutes";
import "./css/App.css";
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  // const {data, setData} = useContext(ResponseContext)

  const apiid = process.env.REACT_APP_APIID;

  const navigate = useNavigate()
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiid}&units=metric`;
  // console.log(url1)


  // const getLogin =() =>{
  //   window.FB.getLoginStatus(function(response) {
  //     // this will be called when the roundtrip to Facebook has completed
  //     console.log("Logout status", response)
  //     window.FB.logout(function(response) {
  //     console.log("Lout",response)
  //   });
  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log(cookie)
    }
   }


    const getLogin = () => {
      window.FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          window.FB.logout(function(response) {
          console.log(response)
          navigate("/")
        })
       }
    })
  }


  const getData = (event) => {
    if (event.key === "Enter") {
      try {
        
        axios({
          url: url1,
          method: "get",
        }).then((res) => {
            toast.success("Success")
            setTimeout(() => {
              // console.log(res.data);
              setData(res.data);    
            }, 60);      
          },
          (err) => {
            if(err.response.status === 404){
              toast.error("Please Check The City Name")  
            }
            console.log(err);
          }
        );
      } catch (error) {
        console.log(error)
      }
      setCity("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          onChange={event => setCity(event.target.value)}
          onKeyPress={getData}
          placeholder='Enter City'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="city">
            <p>{data.name} {data.sys ? <span>[{data.sys.country}]</span> : null}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} m/s</p> : null}
              <p>Wind Speed</p>
            </div>
            
          </div>
          


        }
        <div className="d-flex flex-column" style={{"marginTop": "1rem"}}>
            <button className="lbtn btn btn-primary" onClick={getLogin}>Logout</button>
          </div>


      </div>
      <ToastContainer />

      
  </div>
  );
};

export default App;
