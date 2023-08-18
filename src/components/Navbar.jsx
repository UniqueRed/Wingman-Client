import {useEffect, React} from 'react'
import logo from '../assets/wingman-logo-white.png'

const Navbar = () => {

    const password = import.meta.env.VITE_ADMIN_PASSWORD;

    let mode = localStorage.getItem("lightMode");

    function Home() {
        location.assign("/home");
    }

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

    function Theme() {
        let primary = document.getElementsByClassName("primary");
        let secondary = document.getElementsByClassName("secondary");

        for(var i = 0; i < primary.length; i++) {
            primary[i].classList.toggle("primary-light");
        }

        for(var i = 0; i < secondary.length; i++) {
            secondary[i].classList.toggle("secondary-light");
        }

        document.body.classList.toggle("primary-light");

        if(document.body.classList.contains("primary-light")) {
            localStorage.setItem("lightMode", "light");
            document.getElementById("logo").style.filter = "invert(100%)";
        }
        else {
            localStorage.setItem("lightMode", "dark");
            document.getElementById("logo").style.filter = "invert(0%)";
        }

        console.log(localStorage.getItem("lightMode"));
    }

    const primary = document.getElementsByClassName("primary");
        const secondary = document.getElementsByClassName("secondary");
        if(mode === "light") {
            console.log("true");
    
            for(var i = 0; i < primary.length; i++) {
                primary[i].classList.add("primary-light");
            }
    
            for(var i = 0; i < secondary.length; i++) {
                secondary[i].classList.add("secondary-light");
            }
    
            document.body.classList.add("primary-light");
        }

    function LoadTheme() {
        console.log("loaded");
        const primary = document.getElementsByClassName("primary");
        const secondary = document.getElementsByClassName("secondary");
        if(mode === "light") {
            console.log("true");
    
            for(var i = 0; i < primary.length; i++) {
                primary[i].classList.add("primary-light");
            }
    
            for(var i = 0; i < secondary.length; i++) {
                secondary[i].classList.add("secondary-light");
            }
    
            document.body.classList.add("primary-light");
        }
        
        if(mode === "dark") {
            console.log("false");
    
            for(var i = 0; i < primary.length; i++) {
                primary[i].classList.remove("primary-light");
            }
    
            for(var i = 0; i < secondary.length; i++) {
                secondary[i].classList.remove("secondary-light");
            }
    
            document.body.classList.remove("primary-light");
        }
    }

    useEffect(() => {
        LoadTheme();
    }, []);

  return (
    <>
        <div className='navbar secondary'>
            <div className="header">
                <img id="logo" className="logo" src={logo} alt="" />
                <button onClick={Home} className="navbar-title secondary"><h1>Wingman</h1></button>
            </div>
            <div className="button-container">
                <button onClick={Home} className='button navbar-buttons primary'>Home</button>
                {/* <button className='button navbar-buttons primary'>About</button> */}
                {/* <select onChange={View} id="view" className='button navbar-buttons'>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select> */}
                <button onClick={Admin} className='button navbar-buttons primary'>Admin</button>
                <button onClick={User} className='button navbar-buttons primary'>User</button>
                {/* <button onClick={Theme} className='button navbar-buttons primary'>Change Theme</button> */}
            </div>
        </div>
    </>
  )
}

export default Navbar