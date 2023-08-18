import React from 'react'
import CreateCard from '../components/CreateCard'
import ListEventsAdmin from '../components/ListEventsAdmin'
import Navbar from '../components/Navbar'

const Admin = () => {
  return (
    <>
        <Navbar/>
        {/* <h1 style={{backgroundColor: "transparent"}}className='header'>Volbird</h1>
        <hr></hr> */}
        <div className="main-container">
            <CreateCard/>
            <ListEventsAdmin/>
        </div>
    </>
  )
}

export default Admin