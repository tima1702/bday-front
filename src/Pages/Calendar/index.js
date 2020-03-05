import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { calendarFetchList } from '../../Reducers/calendar';

function Calendar() {
  const { payload } = useSelector(state => state.calendar.list, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarFetchList());
  }, [dispatch]);

  console.log('..........', payload);
  return <div>CalendarPage{JSON.stringify(payload)}</div>;
}

export default Calendar;
