import React from 'react'
import { Link } from 'react-router-dom'
import "./css/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className='container-fluid'>
          
          <h4 className="text-center">Home</h4>
          <hr/>
          <Link className='link' to="/app"><span className='span'>Click to App</span></Link>
          <hr className='footer'/>
      </div>

    </div>
  )
}

export default Home