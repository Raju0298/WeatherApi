import "./index.css";
import React, {useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const apiid = "0279e93c8de9c5246af753f3d3d47595";
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiid}&units=metric`;


  const getData = (event) => {
    if (event.key === "Enter") {
      axios({
        url: url1,
        method: "get",
      }).then((res) => {
          toast.success("Success")
          setTimeout(() => {
            console.log(res.data);
            setData(res.data);    
          }, 60);      
        },
        (err) => {
          if(err.response.status === 404){
            toast.error("Please Check The City Name")  
          }
          // console.log(err);
        }
      );
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
            <p>{data.name} {data.sys ? <h6>[{data.sys.country}]</h6> : null}</p>
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


      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
