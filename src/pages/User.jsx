import React from 'react'
import CreateCard from '../components/CreateCard'
import Navbar from '../components/Navbar'
import ListEventsGuest from '../components/ListEventsGuest'

const User = () => {
  return (
    <>
        <Navbar/>
        <div className="main-container">
            <ListEventsGuest/>
        </div>
    </>
  )
}

export default User