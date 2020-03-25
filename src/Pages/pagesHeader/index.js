import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, useLocation,} from 'react-router-dom';
import './style.scss';
import imgBday from '../../image/iconBday.png';
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import {useDispatch} from "react-redux";
import {calendarAddBday, calendarFetchListOfBdays} from "../../Reducers/calendar";
import moment from "moment";
import SnackBar from "../../components/SnackBar";

export default function () {
    const [showModal, setShowModal] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    let location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = useCallback((data) => {
        dispatch(calendarAddBday(data)).then((resp) => {
            //выводим сообщение, что все успешно добавлено
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);
            dispatch(calendarFetchListOfBdays());

        }).catch((err) => {
            //console.log('err: '+err);
            //обработать возможные ошибки
        })
    }, []);
    // () => handleDelete(subItem['id'])
    return (
        <>
            <Modal show={showModal} header={'Add birthday'}
                   content={<Form editData={{firstName: '', lastName: '', data: {}, date: ''}} onSave=
                       {(data) => {
                           handleAdd({...data, date: moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix()});
                           setShowModal(false);
                       }}
                   />} toClose={() => setShowModal(false)}/>
            <SnackBar show={showSnackBar} content={'Birthday successfully added'}/>


            <div className='router'>
                <ul>
                    <li>
                        <img src={imgBday} alt={'Bday'}/>
                    </li>
                    <li>
                        <Link to="/" className={('/'===location.pathname)?'active':''}>Main</Link>
                    </li>
                    <li>
                        <Link to={location.pathname} onClick={() => setShowModal(true)}>Add birthday</Link>
                    </li>
                    <li>
                        <Link to="/show-all-birthday" className={('/show-all-birthday'===location.pathname)?'active':''}>Show all birthdays</Link>
                    </li>
                    <li className="dropdown">
                        <Link to={location.pathname} className={('/show-all-templates'===location.pathname)?'active':''}>Templates</Link>
                            <div className="dropdown-content">
                                <Link to="/show-all-templates">Show all templates</Link>
                                <Link to={location.pathname}>Add new templates</Link>
                            </div>

                    </li>
                </ul>
            </div>

        </>
    );
}
