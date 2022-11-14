import React from 'react'
import '../../css/Calendar.scss'

import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from 'moment';
// import { useQuery } from 'react-apollo-hooks';

import EventPopover from '../Events/EventPopover';
import EventModal from '../Events/EventModal';
import { EVENTS_QUERY } from '../queries';

import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const transformItems = eventsList =>
	eventsList.items.map(item => {
		return {
		...item,
		email: item.email || '',
		description: item.description || '',
		start: new Date(item.startAt),
		end: new Date(item.endAt)
		};
});

const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY ="holiday@group.v.calendar.google.com"; 
const API_KEY = "AIzaSyBmzeX-SoCjmUgrPhdM26nDZ2biIkHukCA";
const CALENDAR_REGION = "uk.ukrainian"; 


const CalendarComp = () => {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [holidays, setHolidays] = React.useState([]);
  const [eventsList, setEventsList] = React.useState([]);

  const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`

const transformItems = holidays =>
holidays.map(item => {
		return {
		title: item.summary,
		end: moment(item.end.date, moment.defaultFormat).toDate(),
		start: moment(item.start.date, moment.defaultFormat).toDate(),
		};
});



React.useEffect(() => {
  fetch(url).then(response => response.json()).then(data => {
    setHolidays(data.items);
  })
} , []) 

React.useEffect(() => {
  fetch('/api/events').then(response => response.json()).then(data => {
    setEventsList(data.values.result);
  })
} , []) 

const transformEvents = eventsList =>
eventsList.map(item => {
		return {
		title: item.title,
    description: item.description,
    category: item.category_id,
		end: moment(item.endAt, moment.defaultFormat).toDate(),
		start: moment(item.startAt, moment.defaultFormat).toDate(),
		};
});

const [checked, setChecked] = React.useState([]);
const checkList = ["Xui1", "Xui2", "Xui3", "Xui4"];
const handleCheck = (event) => { // pizda
  var updatedList = [...checked];
  if (event.target.checked) {
    updatedList = [...checked, event.target.value];
  } else {
    updatedList.splice(checked.indexOf(event.target.value), 1);
  }
  setChecked(updatedList);
};

const checkedItems = checked.length
? checked.reduce((total, item) => {
    return total + ", " + item;
  })
: "";

let isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item";


  return (
    <div className="form-background">
    <div className="calendar">
      <div style={{ height: '100vh' }}>
        <Calendar
          views={['month', 'week', 'day']} 
          defaultView='month'
          localizer={localizer}
          events={transformItems(holidays)}
          backgroundEvents={transformEvents(eventsList)}
          startAccessor="start"
          endAccessor="end"
          components={{ event: EventPopover }}
          showMultiDayTimes
          selectable
          onSelectSlot={({ start, end }) => {
            setSelectedStartDate(start);
            setSelectedEndDate(end);
            setIsModalOpen(true);
          }}
          eventPropGetter={(eventsList) => {
            console.log(eventsList)
            const backgroundColor = eventsList.category === 1 ? 'blue' : 'red';
            const color = 'white';
            return { style: { backgroundColor ,color} }
          }}
        />

    <div className="app">
      <div className="checkList">
        <div className="title">Events</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {`Items checked are: ${checkedItems}`}
      </div>
    </div>

        <EventModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          event={{
            startAt: selectedStartDate,
            endAt: selectedEndDate,
            title: '',
            email: '',
            description: ''
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default CalendarComp;