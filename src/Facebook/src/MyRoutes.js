import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fbscript from './Fbscript'
import Fbshow from './Fbshow'


 


export const ResponseContext = createContext(null)
const MyRoutes = () => {

  const [data, setData] = useState({})

  return (
    <ResponseContext.Provider value={{data,setData}}>
      <BrowserRouter>
      <div>
      <Routes>
          <Route exact path="/" element={<Fbscript/>}/>
          <Route path="/show" element={<Fbshow/>}/>
        
          

      </Routes>
      </div>
          
      </BrowserRouter>
    </ResponseContext.Provider>
  )
}

export default MyRoutes