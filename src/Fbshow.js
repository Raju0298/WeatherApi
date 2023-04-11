import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResponseContext } from './MyRoutes'
import './css/Login.css'

const Fbshow = () => {
    const navigate = useNavigate()
    const {data, setData} = useContext(ResponseContext)
    console.log("UseContext",data)

    const getLogout = () => {
        window.FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            window.FB.logout(function(response) {
            console.log(response)
            navigate("/")
          })
         }
      })
    }
    
  return (
    <div className='fbshow'>
        <div className='container-fluid'>
            <img src={data.picture.data.url} width={100} height={100}/>
            <h1 className='text-center mt-4'> First Name:  {data.first_name}</h1>
            <h1 className='text-center mt-3'> Last Name:  {data.last_name}</h1>
            <h1 className='text-center mt-3'>Email: {data.email}</h1>
            <button className="btn btn-primary mt-2" onClick={getLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Fbshow