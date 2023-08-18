import React, {useState} from 'react'

const CreateCard = () => {
    const baseUrl = "https://wingman-server-ho1e.onrender.com";

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [link, setRegistration] = useState("");
    const [hours, setHours] = useState("");
    const [description, setDescription] = useState("");
    const [email, setContact] = useState("");

    const password = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const handleRegistrationChange = (e) => {
        setRegistration(e.target.value);
    }

    const handleHoursChange = (e) => {
        setHours(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleContactChange = (e) => {
        setContact(e.target.value);
    }

    const handleEventPost = async(e) => {
        e.preventDefault();
        const enteredPassword = document.getElementById("password").value
        if(enteredPassword === password) {
            try {
                const body = {title, date, time, location, link, hours, description, email};
                const response = await fetch(baseUrl, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
    
                window.location.assign("/admin");
            } catch (error) {
                console.error(error.message);
            }
        }
        else {
            alert("Incorrect Password");
        }
    }

  return (
    <>
        <div className="top-container">
            <div className='form-container secondary'>
                {/* <h2 style={{textAlign: "center", backgroundColor: "#e2b714", padding: "20px", borderRadius: "15px", color: "white"}}>Post an Event</h2> */}
                <h2>Post an Event</h2>
                <input value={title} onChange={handleTitleChange} className="input-field primary" type="text" id="title" placeholder="Event Title"/>
                <input value={date} onChange={handleDateChange} className="input-field primary" type="date" id="date" placeholder="Event Date"/>
                <input value={time} onChange={handleTimeChange} className="input-field primary" type="time" id="time" placeholder="Event Time"/>
                <input value={location} onChange={handleLocationChange} className="input-field primary" type="text" id="location" placeholder="Event Location"/>
                <input value={link} onChange={handleRegistrationChange} className="input-field primary" type="text" id="registration" placeholder="Registration Link"/>
                <input value={hours} onChange={handleHoursChange} className="input-field primary" type="number" id="hours" placeholder="Hours"/>
                <textarea value={description} onChange={handleDescriptionChange} className="input-field primary" type="text" id="description" placeholder="Event Description"/>
                <input value={email} onChange={handleContactChange} className="input-field primary" type="text" id="contact" placeholder="Contact Email"/>
                <input className="input-field primary" type="password" id="password" placeholder="Password"/>
                <button className="button post" id="post-button" onClick={handleEventPost}>Post Event</button>
            </div>
            {/* <div className='top-divider'/>
            <div className="title-container">
                <h1>Volbird</h1>
                <p>Where Opportunities Take Flight</p>
            </div> */}
        </div>
    </>
  )
}

export default CreateCard