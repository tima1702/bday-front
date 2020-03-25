import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {calendarFetchListOfBdays, calendarDeleteBday, calendarEditBday} from '../../Reducers/calendar';
import moment from "moment";
import Calendar from "../../components/calendar";
import './style.scss';
import Table from "../../components/table";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Modal from "../../components/Modal";

function CalendarPage() {
    const {payload} = useSelector(state => state.calendar.list, shallowEqual);
    const isLoading = useSelector(state => state.calendar.list.isLoading, shallowEqual);
    const dispatch = useDispatch();
    const [dateForCalendar, setDateForCalendar] = useState(moment());
    const [showModal, setShowModal] = useState(false);//модалка для редактирования ДР
    const [editData, setEditData] = useState({id: null, firstName: '', lastName: '', data: {}, date: ''});//редактируемые данные, которые отобажаются в модалке

    useEffect(() => {
        dispatch(calendarFetchListOfBdays());
    }, [dispatch]);

    const handleEdit = useCallback((id, date) => {
        dispatch(calendarEditBday(id, date)).then(() => {
            dispatch(calendarFetchListOfBdays());
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(calendarDeleteBday(id)).then(() => dispatch(calendarFetchListOfBdays())).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    //формирование массива "важных дат" для календаря
    let importantDates = [];
    try {
        importantDates = payload[dateForCalendar.format('MMMM')].map((item) => {
            return item['day'];
        });

        if (!isLoading) {
            tablePattern.content = [];
            //выводим дни рождения только того месяца, который отображен на календаре
            payload[dateForCalendar.format('MMMM')].forEach((subItem, subIndex) => {
                let action = [<Button key={'ButtonEdit' + subIndex} children={'Edit'} className={"btnEdit"}
                                      onClick={() => {
                                          setShowModal(true);
                                          setEditData({
                                              id: subItem.id,
                                              firstName: subItem.firstName,
                                              lastName: subItem.lastName,
                                              data: {},
                                              date: ''
                                          })
                                      }}/>,
                    <Button key={'ButtonDelete' + subIndex} children={'Delete'} className={"btnDelete"}
                            onClick={() => handleDelete(subItem['id'])}/>];

                tablePattern.content.push([
                    {
                        name: 'date', className: 'td-m',
                        children: subItem.day,
                    },
                    {
                        name: 'name',
                        children: subItem.fullName,
                        className: 'th-l',
                    },
                    {
                        name: 'action',
                        className: 'td-action',
                        children: action,
                    }
                ])
            });

        }
    } catch (e) {
        importantDates = [];
    }

    //console.log('..........', payload);
    //return <div>CalendarPage{JSON.stringify(payload)}</div>;
    return <div>
        <Modal show={showModal} header={'Edit birthday'}
               content={<Form onSave={(data) => {
                   handleEdit(data.id, {
                       firstName: data.firstName,
                       lastName: data.lastName,
                       data: data.data,
                       date: moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix(),
                   });
                   setShowModal(false);
               }} editData={editData}/>}
               toClose={() => setShowModal(false)}
        />
        <Calendar date={dateForCalendar}
                  importantDates={importantDates}
                  classNameCursor={isLoading ? 'waitCursor' : ''}
                  clickPrevButton={() => setDateForCalendar(moment(dateForCalendar.subtract(1, 'months').format('DD/MM/YYYY'), 'DD/MM/YYYY'))}
                  clickNextButton={() => setDateForCalendar(moment(dateForCalendar.add(1, 'months').format('DD/MM/YYYY'), 'DD/MM/YYYY'))}/><br/>
        <Table classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}
               header={tablePattern.header} content={tablePattern.content}
               isLoading={isLoading}/>

    </div>;
}

export default CalendarPage;

let tablePattern = {
    classNameTable: '',
    classNameTableHead: '',
    header: [
        {name: 'date', alias: 'Day', className: 'td-sm'},
        {name: 'fullName', alias: 'Name', className: 'td-l'},
        {name: 'action', alias: '', className: 'td-action'},],
    content: []
};
