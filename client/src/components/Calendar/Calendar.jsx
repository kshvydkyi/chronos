import React from 'react'
import '../../css/Calendar.scss'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
// import { useQuery } from 'react-apollo-hooks';

import EventPopover from '../Events/EventPopover';
import EventModal from '../Events/EventModal';
import CalendarModal from './CalendarModal';
import Form from 'react-bootstrap/Form';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

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
const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY = "holiday@group.v.calendar.google.com";
const API_KEY = "AIzaSyBmzeX-SoCjmUgrPhdM26nDZ2biIkHukCA";
const CALENDAR_REGION = "uk.ukrainian";


const CalendarComp = () => {
	const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
	const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [holidays, setHolidays] = React.useState([]);
	const [eventsList, setEventsList] = React.useState([]);
	const [calendarsList, setCalendarsList] = React.useState(['Holidays']);
	const [userId, setUserId] = React.useState();
	const [modalOpen, setModalOpen] = React.useState(false);
	const navigate = useNavigate();
	// get id
	const currentUser = JSON.parse(localStorage.getItem('autorized'));
	
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
	}, [])

	React.useEffect(() => {
		fetch(`/api/events/usersEvents/${currentUser.userId}`).then(response => response.json()).then(data => {
			setEventsList(data.values.result);
		})
	}, [])

	React.useEffect(() => {
		fetch(`/api/calendars/users/${currentUser.userId}`).then(response => response.json()).then(data => {
			setCalendarsList(data.values.result);
		})
	}, [])

	const transformEvents = eventsList => 
		// if (!eventsList) return;
		eventsList.map(item => {
			return {
				id: item.id,
				title: item.title,
				description: item.description,
				category: item.category_id,
				end: moment(item.endAt, moment.defaultFormat).toDate(),
				start: moment(item.startAt, moment.defaultFormat).toDate(),
			};
		});
		
		const transformCalendars = calendars => 
		calendars.map(item => {
			return {
				id: item.id,
				title: item.title,
			};
		});	
	
	const [checked, setChecked] = React.useState([]);
	const [holidaysHide, setHolidaysHide] = React.useState(false);
	const [eventsHide, setEventsHide] = React.useState(false);

	const handleCheck = (event) => { // pizda
		var updatedList = [...checked];
		if (event.target.checked) {
			updatedList = [...checked, event.target.value];
			if (event.target.value === 'Holidays') setHolidaysHide(true)
			if (event.target.value === 'Events') setEventsHide(true)
		} else {
			if (event.target.value === 'Holidays') setHolidaysHide(false)
			if (event.target.value === 'Events') setEventsHide(false)
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
		<>
			<div>
				<div className="form-background">
					<div className="calendar d-flex">
						<div className="checkList">
							<div className="p-1 m-2">
								<h3 className="title">Calendars</h3>
								<Form.Check className="">
									<Form.Check.Input value={'Holidays'} type="checkbox" onChange={handleCheck} />
									<Form.Check.Label className={isChecked('Holidays')}>Holidays</Form.Check.Label>
								</Form.Check>
								{transformCalendars(calendarsList).map((item, index) => (
									<>
									<Form.Check className="" key={index}>
										<Form.Check.Input value={item.title} type="checkbox" onChange={handleCheck} />
										<Form.Check.Label onClick={() => setModalOpen(true)} className={isChecked(item.title)}>{item.title}</Form.Check.Label>
									</Form.Check>
									
										<CalendarModal
										isOpen={modalOpen}
										closeModal={() => setModalOpen(false)}
										event={{
											id: item.id,
											title: item.title
										}}
									/>
								</>
								))}
							</div>
						</div>
						<div className="w-100 " style={{ height: '100vh' }}>
							<Calendar
								localizer={localizer}

								backgroundEvents={holidaysHide === false ? transformItems(holidays) : [{
									endDate: new Date('December 10, 2017 11:13:00'),
									startDate: new Date('December 09, 2017 11:13:00'),
									title: 'hi',
								}]}

								events={eventsHide === false ? transformEvents(eventsList) : [{
									endDate: new Date('December 10, 1990 11:13:00'),
									startDate: new Date('December 09, 1990 11:13:00'),
									title: 'hi',
								}]}

								startAccessor="start"
								endAccessor="end"
								className=''
								components={{ event: EventPopover }}
								showMultiDayTimes
								selectable
								onSelectSlot={({ start, end }) => {
									setSelectedStartDate(start);
									setSelectedEndDate(end);
									setIsModalOpen(true);
								}}
								showAllEvents={true}
							// eventPropGetter={(eventsList) => {
							// 	const backgroundColor = eventsList.category === 1 ? 'blue' : 'red';
							// 	const color = 'white';
							// 	return { style: { backgroundColor, color } }
							// }}
							/>

							<EventModal
								isOpen={isModalOpen}
								closeModal={() => setIsModalOpen(false)}
								event={{
									startAt: selectedStartDate,
									endAt: selectedEndDate,
									title: '',
									email: '',
									description: '',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CalendarComp;