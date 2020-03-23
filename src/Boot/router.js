import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import CalendarPage from '../Pages/Main';
import './router.scss';
import imgBday from '../image/iconBday.png';
import ShowAllBdayPage from "../Pages/ShowAllBday";
import Modal from "../components/Modal";
import Form from "../components/Form";

export default function () {
    const [showModal, setShowModal] = useState(false);

    return (
        <Router>
            <Modal show={showModal} header={'Add birthday'}
                   content={<Form onSave={(data) => console.log('save and close modal', data)}/>}
                   toClose={() => setShowModal(false)}/>

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

            <Switch>
                <Route path="/" exact>
                    <CalendarPage/>
                </Route>
                <Route path="/AddBday">

                </Route>
                <Route path="/ShowAllBdays">
                    <ShowAllBdayPage/>
                </Route>
            </Switch>
        </Router>
    );
}
