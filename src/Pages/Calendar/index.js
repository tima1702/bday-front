import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {calendarFetchList} from '../../Reducers/calendar';
import moment from "moment";
import Calendar from "../../components/calendar";
import './style.scss';
import Table from "../../components/table";

function CalendarPage() {
    const {payload} = useSelector(state => state.calendar.list, shallowEqual);
    const isLoading = useSelector(state => state.calendar.isLoading, shallowEqual);
    const dispatch = useDispatch();
    const [dateForCalendar, setDateForCalendar] = useState(moment('20/03/2020', 'DD/MM/YYYY'));

    useEffect(() => {
        dispatch(calendarFetchList());
    }, [dispatch]);
    if (isLoading) {

    } else {

    }
    //формирование массива "важных дат" для календаря
    let importantDates = [];
    try {
        importantDates = payload[dateForCalendar.format('MMMM')].map((item) => {
            return item['day'];
        });
    } catch (e) {

    }

    //console.log('..........', payload);
    //return <div>CalendarPage{JSON.stringify(payload)}</div>;
    return <div><Calendar date={dateForCalendar}
                          importantDates={importantDates}
                          classNameCursor={isLoading?'waitCursor':''}
                          clickPrevButton={() => setDateForCalendar(moment(dateForCalendar.subtract(1, 'months').format('DD/MM/YYYY'), 'DD/MM/YYYY'))}
                          clickNextButton={() => setDateForCalendar(moment(dateForCalendar.add(1, 'months').format('DD/MM/YYYY'), 'DD/MM/YYYY'))}/><br/>
        {/*<Table classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}*/}
        {/*       header={tablePattern.header} content={tablePattern.content}*/}
        {/*       isLoading={false}/>*/}

    </div>;
}

export default CalendarPage;

let tablePattern = {
    classNameTable: '',
    classNameTableHead: '',
    header: [{name: 'id', alias: '№', className: 'td-sm'},
        {name: 'name', alias: 'Name', className: 'td-l'},
        {name: 'date', alias: 'date', className: 'td-action'},
        {name: 'action', alias: '', className: 'td-action'},],
    content: []
};