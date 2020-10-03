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
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
    <React.StrictMode>
      <AuthContextProvider>
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
        </AuthContextProvider>
    </React.StrictMode>,
  document.getElementById('root')
);
