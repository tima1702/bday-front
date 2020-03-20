import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import CalendarPage from '../Pages/Calendar';
import './router.scss'
import moment from "moment";

export default function () {
    return (
        <Router>
            <div className='router'>
                <ul>
                    <li>
                        <Link to="/AddBday">Add birthday</Link>
                    </li>
                </ul>
            </div>

            <Switch>
                <Route path="/" exact>
                    <CalendarPage/>
                </Route>
                <Route path="/AddBday">
                    ADD BIRTHDAY<CalendarPage/>
                </Route>
            </Switch>
        </Router>
    );
}
