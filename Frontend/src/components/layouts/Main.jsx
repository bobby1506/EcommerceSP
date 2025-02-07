import React from 'react'
import Navbar from "./Navbar"

const Main = ({children}) => {
  
  return (
   <>
   <Navbar/>
   <main>
    {children}
   </main>
   </>
  )
}

export default Main