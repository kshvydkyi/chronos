import React from 'react'
import '../../css/Calendar.css'
import CalendarComp from "@ericz1803/react-google-calendar"

const API_KEY = "AIzaSyBmzeX-SoCjmUgrPhdM26nDZ2biIkHukCA";
let calendars = [
  {calendarId: "09opmkrjova8h5k5k46fedmo88@group.calendar.google.com", color: "#B241D1"}, //add a color field to specify the color of a calendar
  {calendarId: "hkr1dj9k6v6pa79gvpv03eapeg@group.calendar.google.com"}, //without a specified color, it defaults to blue (#4786ff)
  {calendarId: "rg4m0k607609r2jmdr97sjvjus@group.calendar.google.com", color: "rgb(63, 191, 63)"} //accepts hex and rgb strings (doesn't work with color names)
];

const Calendar = () => { 
    
    return(
    <>
    <div className="form-background d-flex justify-content-center text-white">
        <div className='d-flex flex-column'>
        <CalendarComp apiKey={API_KEY} calendars={calendars} />
        </div>
        </div>
    </>
 )
}

export default Calendar;