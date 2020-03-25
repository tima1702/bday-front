import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import CalendarPage from '../Pages/Main';
import ShowAllBdayPage from "../Pages/ShowAllBday";
import PagesHeaders from "../Pages/pagesHeader";

export default function () {
    return (
        <Router>
            <PagesHeaders/>
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
