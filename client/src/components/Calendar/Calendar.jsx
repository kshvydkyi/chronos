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



  // const { data, error, loading } = (EVENTS_QUERY);
  // if (error) return console.log(error);
  // if (loading)
  //   return (
  //     <div className="calendar">
  //       <p>Loading...</p>
  //     </div>
  //   );





  return (
    <div className="form-background">
    <div className="calendar">
      <div style={{ height: '100vh' }}>
        <Calendar
          localizer={localizer}
          // Events={transformItems("")}
          events={transformItems(holidays)}
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
        />

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