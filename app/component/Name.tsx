'use client'
import React, { useState } from 'react'
import "../mymovielist/myMovieList.css";

function Name() {
  let x = JSON.stringify(localStorage.getItem("name"))
  x=x.replace(/"/g,'')
    const [name, setName] = useState(x)
    
  return (
    <h2 style={{paddingRight:"2rem"}} className="links welcome">Welcome {name} </h2>
  )
}

export default Name