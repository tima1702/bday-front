import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, useLocation,} from 'react-router-dom';
import './style.scss';
import imgBday from '../../image/iconBday.png';
import Modal from "../../components/Modal";
import FormBday from "../../components/FormBday";
import {useDispatch} from "react-redux";
import {calendarAddBday, calendarFetchListOfBdays} from "../../Reducers/calendar";
import moment from "moment";
import SnackBar from "../../components/SnackBar";
import FormTemplate from "../../components/FormTemplate";
import {calendarAddTemplate, calendarFetchListOfTemplates} from "../../Reducers/templates";

export default function () {
    const [showModalBday, setShowModalBday] = useState(false);
    const [showModalTemplate, setShowModalTemplate] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarContent, setSnackBarContent] = useState('');

    let location = useLocation();
    const dispatch = useDispatch();

    const handleAddBday = useCallback((data) => {
        dispatch(calendarAddBday(data)).then((resp) => {
            //выводим сообщение
            if (resp.ok) {
                setSnackBarContent('Birthday successfully added');
            } else {
                setSnackBarContent('Error: '+resp.statusText);
            }
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);
            dispatch(calendarFetchListOfBdays());

        }).catch((err) => {
            setSnackBarContent('Error: '+err);
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);
            //console.log('err: '+err);
            //обработать возможные ошибки
        })
    }, []);

    const handleAddTemplate = useCallback((data) => {
        dispatch(calendarAddTemplate(data)).then((resp) => {
            if (resp.ok) {
                setSnackBarContent('Templates successfully added');
            } else {
                setSnackBarContent('Error: '+resp.statusText);
            }

            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);
            dispatch(calendarFetchListOfTemplates());

        }).catch((err) => {
            //console.log('err: '+err);
            //обработать возможные ошибки
        })
    }, []);

    return (
        <>
            <Modal show={showModalBday} header={'Add birthday'}
                   content={<FormBday editData={{firstName: '', lastName: '', data: {}, date: ''}} onSave=
                       {(data) => {
                           handleAddBday({...data, date: moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix()});
                           setShowModalBday(false);
                       }}
                   />} toClose={() => setShowModalBday(false)}/>

            <Modal show={showModalTemplate} header={'Add template'}
                   content={<FormTemplate editData={{title: '', text: '', blocks: [], attachments: []}} onSave=
                       {(data) => {
                           handleAddTemplate(data);
                           setShowModalTemplate(false);
                       }}
                   />} toClose={() => setShowModalTemplate(false)}/>

            <SnackBar show={showSnackBar} content={snackBarContent}/>

            <div className='router'>
                <ul>
                    <li>
                        <img src={imgBday} alt={'Bday'}/>
                    </li>
                    <li>
                        <Link to="/" className={('/' === location.pathname) ? 'active' : ''}>Main</Link>
                    </li>
                    <li className="dropdown">
                        <Link to={location.pathname}
                              className={('/show-all-birthday' === location.pathname) ? 'active' : ''}>Birthdays</Link>
                        <div className="dropdown-content">
                            <Link to={location.pathname} onClick={() => setShowModalBday(true)}>Add birthday</Link>
                            <Link to="/show-all-birthday">Show all birthdays</Link>
                        </div>
                    </li>
                    <li className="dropdown">
                        <Link to={location.pathname}
                              className={('/show-all-templates' === location.pathname) ? 'active' : ''}>Templates</Link>
                        <div className="dropdown-content">
                            <Link to={location.pathname} onClick={() => setShowModalTemplate(true)}>Add new
                                templates</Link>
                            <Link to="/show-all-templates">Show all templates</Link>
                        </div>

                    </li>
                </ul>
            </div>

        </>
    );
}
