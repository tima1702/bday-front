import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {calendarFetchListsOfTemplates} from '../../Reducers/templates';
import moment from "moment";
import Calendar from "../../components/calendar";
import './style.scss';
import Table from "../../components/table";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Modal from "../../components/Modal";

export default function () {
    const dispatch = useDispatch();
    const {payload} = useSelector(state => state.templates.list, shallowEqual);
    const isLoading = useSelector(state => state.templates.list.isLoading, shallowEqual);

    useEffect(() => {
        dispatch(calendarFetchListsOfTemplates());
    }, [dispatch]);

    if (!isLoading) {
        tablePattern.content = [];
        try{
            payload.forEach((item, index) => {
                let action = [<Button key={'ButtonEdit' + index} children={'Edit'} className={"btnEdit"}
                                      onClick={() => console.log('edit temp')}/>,
                    <Button key={'ButtonDelete' + index} children={'Delete'} className={"btnDelete"}
                            onClick={() => console.log('delete temp')}/>];

                tablePattern.content.push([
                    {
                        name: 'name',
                        children: item.title,
                        className: 'th-l',
                    },
                    {
                        name: 'action',
                        className: 'td-action',
                        children: action,
                    }
                ])
            });
        }catch (e) {}
    }

    return (
        <div>
            <br/>
            <Table classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}
                   header={tablePattern.header} content={tablePattern.content}
                   isLoading={isLoading}/>
        </div>
    );
}

let tablePattern = {
    classNameTable: '',
    classNameTableHead: '',
    header: [
        {name: 'name', alias: 'Name', className: 'heading'},
        {name: 'action', alias: '', className: 'heading'},
    ],
    content: []
};
