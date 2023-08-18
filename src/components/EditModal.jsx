import React from 'react'

const EditModal = () => {
  return (
    <>
        <div className='edit-modal'>
            <div className="top-container">
                <div className='form-container'>
                    <h2>Post an Event</h2>
                    <input value={title} onChange={handleTitleChange} className="input-field" type="text" id="title" placeholder="Event Title"/>
                    <input value={date} onChange={handleDateChange} className="input-field" type="date" id="date" placeholder="Event Date"/>
                    <input value={time} onChange={handleTimeChange} className="input-field" type="time" id="time" placeholder="Event Time"/>
                    <input value={location} onChange={handleLocationChange} className="input-field" type="text" id="location" placeholder="Event Location"/>
                    <input value={link} onChange={handleRegistrationChange} className="input-field" type="text" id="registration" placeholder="Registration Link"/>
                    <input value={hours} onChange={handleHoursChange} className="input-field" type="number" id="hours" placeholder="Hours"/>
                    <textarea value={description} onChange={handleDescriptionChange} className="input-field" type="text" id="description" placeholder="Event Description"/>
                    <input value={email} onChange={handleContactChange} className="input-field" type="text" id="contact" placeholder="Contact Email"/>
                    <input className="input-field" type="password" id="password" placeholder="Password"/>
                    <button className="button" id="post-button" onClick={handleEventPost}>Post Event</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditModal