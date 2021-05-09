import React from "react";
import Calendar from "@ericz1803/react-google-calendar";

const API_KEY = "AIzaSyDMBbBr--d1gwyAImHB6ZH9exwc2L0_Fp0";

//uses a google calendar to be displayed on the calendar page on the website
//connected google account (the admin) is able to add, remove, and edit events on their google calendar and changes will automatically display to the webiste
let calendars = [
  {calendarId: "vqprp35ibcb0bos99th200kf28@group.calendar.google.com", 
  color: 'orange'},

];

//the styles used for the website
let styles = {
    //you can use object styles (no import required)
    calendar: {
      borderWidth: "3px", //make outer edge of calendar thicker
      color: 'white',
    },
    eventText: {
        backgroundColor: 'orange',
        color: 'white',
    },
    today: {
        color: 'navy',
        border: '3px solid navy',
    }
  }

//calendar being displayed (exportable) through extending a react component and rendering the styles defined prior along with the google calendar also defined 
//essentially creates a react google calendar to be embedded into the website with full functionality 
class CalendarDisplay extends React.Component {
    render() {
        return (
            <div style={{ paddingTop: '50px', margin: '50px', }}>
                <Calendar apiKey={API_KEY} calendars={calendars} styles={styles}/>
            </div>
        )
    }
}

export default CalendarDisplay;