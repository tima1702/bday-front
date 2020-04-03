import React, {useEffect, useState} from 'react';
import './style.scss'
import Table from "../table";
import Button from "../Button";
import {calendarFetchListOfBdays} from "../../Reducers/calendar";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

function ListOfBdays({onClickGo}) {
    const dispatch = useDispatch();
    const {payload} = useSelector(state => state.calendar.list, shallowEqual);
    const isLoading = useSelector(state => state.calendar.list.isLoading, shallowEqual);
    const [currentId, setCurrentId] = useState(null);//айди USER, с которым в данный момент работает пользователь

    useEffect(() => {
        dispatch(calendarFetchListOfBdays());
    }, [dispatch]);

    let buttonGo = '';
    if (currentId) {
        buttonGo=(<Button className={'button-go'} children={'Go >>'} onClick={()=>onClickGo(currentId)}/>);
    }
    if (!isLoading) {
        tablePattern.content = [];
        try {
            for (const item in payload) {
                payload[item].forEach((subItem) => {
                    tablePattern.content.push([
                        {
                            name: 'name',
                            children: subItem.fullName,
                            className: (currentId === subItem.id) ? 'th-l selectedUser' : 'th-l',
                            onClickRow: () => {
                                setCurrentId(subItem.id);
                            },
                        },
                    ])
                });
            }
        } catch (e) {
        }
    }
    return (
        <div className={'tableOfBdays'}>
            {buttonGo}
            <p className={'selectUser'}><b>Select user:</b></p>
            <Table
                classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}
                header={tablePattern.header} content={tablePattern.content}
                isLoading={isLoading}/></div>
    );
}

export default ListOfBdays;

let tablePattern = {
    classNameTable: '',
    classNameTableHead: '',
    header: [
        //{name: 'name', alias: 'Name', className: 'heading'},
    ],
    content: []
};