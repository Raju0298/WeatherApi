import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Fbinit from './Fbinit'
import Fbscript from './Fbscript'
import Fbshow from './Fbshow'
import Home from './Home'
import Login from './Login'
import Twitter from './Twitter/Twitter'
import Profile from './Twitter/Profile'
 


export const ResponseContext = createContext(null)
const MyRoutes = () => {

  const [data, setData] = useState({})

  return (
    <ResponseContext.Provider value={{data,setData}}>
      <BrowserRouter>
      <div>
      <Routes>
          <Route exact path="/" element={<Fbscript/>}/>
          <Route path="/app" element={<App/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/show" element={<Fbshow/>}/>
          <Route path="/twitter" element={<Twitter/>}/>
          <Route path="profile" element={<Profile/>}/>
          

      </Routes>
      </div>
          
      </BrowserRouter>
    </ResponseContext.Provider>
  )
}

export default MyRoutes