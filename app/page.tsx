"use client"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useState } from "react"


function Home() {
  const [show , setShow] = useState(false)

  function getName(e: ChangeEvent<HTMLInputElement>) {
    e.target.value ===""? setShow(false):setShow(true)
    localStorage.setItem("name", e.target.value)
    
 }

  return (
    <>
      <Image   layout="fill" src="/netflix.png" alt="backgroundImg" />
    <main className="ccontainer">
      <div className="ccontainer2">
        <label className="wwelcomLabel" htmlFor="name">Enter Your Name</label>
          <input onChange={getName} name="name" id="name" className="welcomInput" type="text" />
          {show&&<Link className="ggoButton" href="mymovielist">Let&apos;s Go</Link>}
      </div>
    </main>
    </>
  )
}

export default Home

