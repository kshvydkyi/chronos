import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from '../../api/axios';

  // import {useCreateUpdateMutation, useDeleteMutation} from './eventMutationHooks'
import 'react-datepicker/dist/react-datepicker.css';

import '../../css/Event.css'

const EventForm = ({ event, closeModal }) => {
  const [startAt, setStartDate] = React.useState(new Date(event.startAt));
  const [endAt, setEndDate] = React.useState(new Date(event.endAt));
  const [title, setTitle] = React.useState(event.title);
  const [email, setEmail] = React.useState(event.email);
  const [description, setDescription] = React.useState(event.description);
  const [category, setCateogry] = React.useState(event.category);
  const [userEmail, setUserEmail] = React.useState();

  const [checked, setChecked] = React.useState(false);

  const navigate = useNavigate();

  const handleChange = () => {
    setChecked(!checked);
  };

  const payload = { startAt, endAt, title, email, description, category};

  const eventExists = !!event.title;
  console.log("event title = ", event)

  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const getEmail = async() => {
    const response = await axios.get(`/api/users/${currentUser.userId}`);
    setUserEmail(response.data.values.result.email);
  }

  useEffect(() => {
    getEmail();
  }, [])


  async function submitEvent() {
      const response = await axios.post('/api/events',
        JSON.stringify({ title: title, description: description, 
          email: userEmail, endAt: endAt, startAt: startAt, category_id: category, 
          allDay: 1, calendar_id: 1}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(category)
    window.location.href="/calendar"
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        // createUpdateEvent();
      }}
    >
      <fieldset>
        <div className="container">
          <div className="row">
            <div className="column">
              <label>Start Date</label>
              <DatePicker
                selected={startAt}
                onChange={date => setStartDate(date)}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                showTimeInput
              />
            </div>
            <div className="column">
              <label>End Date</label>
              <DatePicker
                selected={endAt}
                onChange={date => setEndDate(date)}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                showTimeInput
              />
            </div>
          </div>

        <div className="row">
            <div className="column">
              <label>
                <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                />
                Send reminder to your email?
             </label>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of event"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="column ">
              <label htmlFor="title">Category</label>
              <select value={category} className="bg-dark text-white w-100 text-center" onChange={e => setCateogry(e.target.value)}>
                <option value="1">arrangement</option>
                <option value="2">reminder</option>
                <option value="3">task</option>
              </select>

            </div>
          </div> 

          <div className="row">
            <div className="column">
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Add description..."
                id="description"
                columns="50"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="column column-50">
              <input
                className="button-primary"
                type="submit"
                onClick={() => submitEvent()}
                value={eventExists ? 'Update' : 'Create'}
              />
            </div>
            {eventExists && (
              <div className="column column-50">
                <input
                  className="button-danger"
                  type="button"
                  // onClick={deleteEvent}
                  value="Delete"
                />
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default EventForm;