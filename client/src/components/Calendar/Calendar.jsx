import React from 'react'
import '../../css/Calendar.css'
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';

const Calendar = () => { 
    const dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 10);
    const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 6);
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 25);
    return(
    <>
    <div className="form-background d-flex justify-content-center text-white">
        <div className='d-flex flex-column'>
        <h1 className="text-white">КАЛЕНДАР</h1>
        <CalendarComponent 
        value={dateValue} 
        min={minDate} 
        max={maxDate}
        isMultiSelection={true}
        start="Decade"
        depth="Year"
        ></CalendarComponent>
        </div>
        </div>
    </>
 )
}

export default Calendar;