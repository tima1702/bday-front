import React, {useCallback, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './style.scss';
import imgBday from '../../image/iconBday.png';
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import {useDispatch} from "react-redux";
import {calendarAddBday, calendarFetchList} from "../../Reducers/calendar";
import moment from "moment";
import SnackBar from "../../components/SnackBar";

export default function () {
    const [showModal, setShowModal] = useState(false);
    const [showSnackBar, setSnackBar] = useState(false);

    const dispatch = useDispatch();

    const handleAdd = useCallback((data) => {
        dispatch(calendarAddBday(data)).then((resp) => {
            //console.log('resp: '+resp);
            dispatch(calendarFetchList());
            // setSnackBar(true);
            // setTimeout(() => setSnackBar(false), 3000);
        }).catch((err) => {
            //console.log('err: '+err);
            //обработать возможные ошибки
        })
    }, []);
    // () => handleDelete(subItem['id'])
    return (
        <>
            <Modal show={showModal} header={'Add birthday'}
                   content={<Form editData={{firstName: '', lastName: '',data: {}, date: ''}} onSave={(data) => {
                       //console.log({...data, date: moment(data.date+' +0000', 'DD-MM-YYYY Z').unix()});
                       handleAdd({...data, date: moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix()});
                   }}/>} toClose={() => setShowModal(false)}/>
            <SnackBar show={showSnackBar} content={'Birthday successfully added'}/>


            <div className='router'>
                <ul>
                    <li>
                        <img src={imgBday} alt={'Bday'}/>
                    </li>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to='/' onClick={() => setShowModal(true)}>Add birthday</Link>
                    </li>
                    <li>
                        <Link to="/ShowAllBdays">Show all birthdays</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
