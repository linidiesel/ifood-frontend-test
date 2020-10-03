import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/home';
import Callback from './pages/callback';

import './index.css';

ReactDOM.render(
  <div className='container'>
    <React.StrictMode>
        <Router>
          <Switch>
            <Route path="/callback">
              <Callback />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    </React.StrictMode>
  </div>,

  document.getElementById('root')
);
