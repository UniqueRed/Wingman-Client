import React from 'react'
import CreateCard from '../components/CreateCard'
import Navbar from '../components/Navbar'
import logo from '../assets/wingman-logo-white.png'

const Home = () => {

    const password = "123";

    function Admin() {
        // let enteredPassword = prompt("Enter the admin password to gain access to the admin view");

        location.assign("/admin");

        // if(password === enteredPassword) {
        //     location.assign("/admin");
        // }
        // else {
        //     alert("Incorrect password");
        // }
    }

    function User() {
        location.assign("/user");
    }

  return (
    <>
        <Navbar></Navbar>
        <div className="banner">
            <div className="title-container">
                <div style={{display: "flex", flexDirection: "row"}}>
                    <h1 style={{fontSize: "75px"}}>Wingman</h1>
                </div>
                <p style={{fontSize: "18px"}}>Where Opportunities Take Flight</p>
                <div style={{height: "50px"}}></div>
                <p>Continue as:</p>
                <div style={{height: "10px"}}></div>
                <div className="button-container">
                    <button onClick={Admin} className='button navbar-buttons'>Admin</button>
                    <button onClick={User} className='button navbar-buttons'>User</button>
                </div>
            </div>
        </div>
        <div>
            <div className="info-container">
                
            </div>
        </div>
    </>
  )
}

export default Home