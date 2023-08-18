import React, {useState, useEffect} from 'react'
import EditModal from './EditModal';
import classNames from 'classnames';

const ListEventsAdmin = () => {
    const baseUrl = "https://wingman-server-ho1e.onrender.com";

    const [events, setEvents] = useState([]);

    const password = import.meta.env.VITE_ADMIN_PASSWORD;

    const getEvents = async() => {
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();

            setEvents(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getEvents();
    },[]);

    const handleEventDelete = async id => {
        try {
            const enteredPassword = prompt("Enter the password to delete");
            if(enteredPassword === password) {
                const deleteEvent = await fetch(baseUrl + '/' + id, {
                    method: "DELETE"
                });
    
                setEvents(events.filter(event => event.id !== id))
            }
            else {
                alert("Incorrect password");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const addEventToGoogleCalender = async id => {
        const eventDate = await fetch(baseUrl + '/' + id);
        const data = await eventDate.json();

        let date = new Date(data.eventdate).toISOString();
        let time = data.eventtime;
        time = time.replaceAll(":", "")
        date = date.replaceAll(":", "");
        date = date.replaceAll("-", "");
        date = date.replaceAll(".", "");
        date = date.substring(0, date.length - 10);
        date += time;
        // date += "Z0930"
        console.log(date)

        const eventDetails = {
            summary: data.eventtitle,
            start: date,
            reminders: {
              useDefault: true,
            },
          };

          const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            eventDetails.summary
          )}&dates=${encodeURIComponent(
            eventDetails.start + "/" + eventDetails.start
          )}&details=${encodeURIComponent(eventDetails.summary)}`;
    
        window.open(calendarUrl, '_blank');
    }

    const handleRegisterClick = async id => {
        try {
            const eventRegistration = await fetch(baseUrl + '/' + id);
            const data = await eventRegistration.json();

            window.open(data.eventlink);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        loadDate();
        loadTime();
    });

    function loadDate() {
        let date = document.getElementsByClassName("date");

        for(var i = 0; i < date.length; i++) {
            var id = (date[i].id).slice(4);
            date[i].addEventListener("load", formatDate(id));
        }
    }

    function loadTime() {
        let time = document.getElementsByClassName("time");

        for(var i = 0; i < time.length; i++) {
            var id = (time[i].id).slice(4);
            time[i].addEventListener("load", formatTime(id));
        }
    }
    const formatDate = async id => {
        try {
            const getDate = await fetch(baseUrl + '/' + id);
            const data = await getDate.json();

            const date = new Date(data.eventdate);

            let day = date.getDate();

            let month = date.getMonth() + 1;

            let year = date.getFullYear();

            let dateObject = document.getElementById("date" + data.id)
            dateObject.innerHTML = "<b>Date: </b>" + month + '/' + day + '/' + year;
        } catch (error) {
            console.error(error.message);
        }
    }

    const formatTime = async id => {
        try {
            const getTime = await fetch(baseUrl + '/' + id);
            const data = await getTime.json();

            const time = data.eventtime.split(':');

            var timeValue;

            var hours = Number(time[0]);
            var minutes = Number(time[1]);
            var seconds = Number(time[2]);

            if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
            } else if (hours > 12) {
            timeValue= "" + (hours - 12);
            } else if (hours == 0) {
            timeValue= "12";
            }
            
            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
            timeValue += (hours >= 12) ? " P.M." : " A.M.";

            let timeObject = document.getElementById("time" + data.id);
            timeObject.innerHTML = "<b>Time: </b>" + timeValue;
        } catch (error) {
            console.error(error.message);
        }
    }

    var current_rotation = 270;

    const handleExpand = async id => {
        try {
            const info = await fetch(baseUrl + '/' + id);
            const data = await info.json();

            var secondaryInfo = document.getElementsByClassName("secondary-info" + data.id);
            var arrow = document.getElementById("arrow" + data.id);
            var card = document.getElementById("card" + data.id);

            for(var i = 0; i < secondaryInfo.length; i++) {
                if(!(secondaryInfo[i].classList.contains("hidden"))) {
                    current_rotation = 0;
                }
                else {
                    current_rotation = 180;
                }
                
                secondaryInfo[i].classList.toggle("hidden");
            }

            arrow.style.transform = 'rotate(' + current_rotation + 'deg)';
        } catch (error) {
            console.error(error.message);
        }
    }

    // const accordionStyles = {
    //     "--cui-accordion-bg": "#C3DCBC",
    //     "--cui-accordion-btn-focus-box-shadow": "none",
    //     "--cui-accordion-btn-focus-border-color": "none",
    //     "--cui-accordion-active-bg": "#C3DCBC",
    //     "--cui-accordion-active-color": "#33512A",
    //     "--cui-accordion-color": "#33512A",
    //     "--cui-accordion-btn-color": "#33512A",
    // }

  return (
    <>
        {/* <EditModal/> */}
        <hr></hr>
        <h1>Upcoming Events</h1>
        {events.length === 0 ? <p>No upcoming events</p> : null}
        <div className="event-card-holder">
            {events.map(event => (
                <div id={"card" + event.id} key={event.id} className="event-card secondary">
                    <div style={{display:"flex", alignItems: "center", justifyContent: "center", textAlign: "center"}} className="event-card-section primary">
                        <h2>{event.eventtitle}</h2>
                    </div>
                    <div className="event-card-section primary">
                        <p className="date" id={"date" + event.id}><b>Date:</b> {event.eventdate}</p>
                        <p className="time" id={"time" + event.id}><b>Time:</b> {event.eventtime}</p>
                    </div>

                    <div className="event-card-section primary" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <button style={{width: "90%"}} onClick={() => handleEventDelete(event.id)} className='button delete'>Delete</button>
                    </div>

                    <div className="section-divider"></div>

                    <div className={classNames("secondary-info" + event.id, "hidden", "event-card-section", "primary")}>
                        <p><b>Location:</b> {event.eventlocation}</p>
                        <p><b>Hours:</b> {event.eventhours}</p>
                    </div>

                    <div className={classNames("secondary-info" + event.id, "hidden", "event-card-section", "primary")}>
                        <p><b>Contact:</b> <a href = {"mailto:" + event.contactemail}>{event.contactemail}</a></p>
                    </div>

                    <div id={"description" + event.id} className={classNames("secondary-info" + event.id, "hidden", "event-card-section", "primary")}>
                        <p><b>Description:</b> {event.eventdescription}</p>
                    </div>

                    <div className={classNames("secondary-info" + event.id, "hidden", "event-card-section", "primary")} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <button style={{width: "90%"}} className='button add-to-calender' onClick={() => addEventToGoogleCalender(event.id)}>Add To Calender</button>
                    </div>

                    <div className={classNames("secondary-info" + event.id, "hidden", "event-card-section", "primary")} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <button style={{width: "90%"}} className='button' onClick={() => handleRegisterClick(event.id)}>Register</button>
                    </div>
                    
                    <div className="section-divider"></div>

                    <button onClick={() => handleExpand(event.id)} href={"#arrow" + event.id} className='button expand-button primary'><span id={"arrow" + event.id} style={{backgroundColor: "#181818", padding: "10px", borderRadius: "50%"}} className="arrow material-symbols-rounded primary">expand_more</span></button>
                </div>
            ))}
        </div>
    </>
  )
}

export default ListEventsAdmin

