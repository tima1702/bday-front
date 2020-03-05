import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calendar from '../Pages/Calendar';

export default function () {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Calendar />
        </Route>
      </Switch>
    </Router>
  );
}
