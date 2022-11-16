import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from '../../api/axios';

  // import {useCreateUpdateMutation, useDeleteMutation} from './eventMutationHooks'
import 'react-datepicker/dist/react-datepicker.css';

import '../../css/Event.css'

const CalendarForm = ({ event, closeModal }) => {
  const [title, setTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.description);
  const [calendarId, setCalendarId] = React.useState(event.id);
  const [checked, setChecked] = React.useState(false);
    console.log("Event: ", event)
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  
  const calendarExists = !!event.title;

  async function submitCalendar() {
      const response = await axios.post(`/api/calendars`,
        JSON.stringify({ title: title, user_id: currentUser.userId}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
    );
    window.location.href="/calendar"
  }

  async function deleteCalendar() {
    const response = await axios.delete(`/api/calendars/${calendarId}`);
    closeModal()
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


          <div className="d-flex flex-row justify-content-around">
            <div className="column column-50">
              <input
                className="text-white border border-secondary bg-secondary mt-2 p-1 rounded"
                type="submit"
                onClick={() => submitCalendar()}
                value={calendarExists ? 'Update' : 'Create'}
              />
            </div>
            {calendarExists && (
              <div className="column column-50">
                <input
                  className="text-white border border-danger bg-danger mt-2 p-1 rounded"
                  type="button"
                  onClick={() => deleteCalendar()}
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

export default CalendarForm;