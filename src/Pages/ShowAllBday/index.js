import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {calendarFetchList} from '../../Reducers/calendar';
import './style.scss';
import Table from "../../components/table";
import Button from "../../components/Button";
import iconDelete from '../../image/iconDelete.png';
import iconEdit from '../../image/iconEdit.png';

function ShowAllBdayPage() {
    const {payload} = useSelector(state => state.calendar.list, shallowEqual);
    const isLoading = useSelector(state => state.calendar.list.isLoading, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calendarFetchList());
    }, [dispatch]);

    if (!isLoading) {
        tablePattern.content = [];
        let rowNumber = 0;
        for (const item in payload) {
            payload[item].forEach((subItem, subIndex) => {
                let action = [<Button key={'ButtonEdit' + subIndex} children={'Edit'} className={"btnEdit"}
                                      onClick={() => alert('edit Bday #' + (subIndex + 1))}/>,
                    <Button key={'ButtonDelete' + subIndex} children={'Delete'} className={"btnDelete"}
                            onClick={() => alert('delete Bday #' + (subIndex + 1))}/>];

                tablePattern.content.push([
                    {name: 'id', children: ++rowNumber, className: 'td-sm'},
                    {
                        name: 'date', className: 'td-m',
                        children: subItem.day + ' ' + item
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
    }
    //console.log('..........', payload);
    //return <div>CalendarPage{JSON.stringify(payload)}</div>;
    return <div><br/><Table classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}
               header={tablePattern.header} content={tablePattern.content}
               isLoading={isLoading}/>

    </div>;
}

export default ShowAllBdayPage;

let tablePattern = {
    classNameTable: '',
    classNameTableHead: '',
    header: [{name: 'id', alias: '№', className: 'td-sm'},
        {name: 'date', alias: 'date', className: 'td-sm'},
        {name: 'fullName', alias: 'Name', className: 'td-l'},
        {name: 'action', alias: '', className: 'td-action'},],
    content: []
};
