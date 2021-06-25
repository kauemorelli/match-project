import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './components/Main';
import CardsPage from './components/Main/CardsPage';
import Admin from './components/Admin';
import Dashboard from './components/Admin/Dashboard';
import Users from './components/Admin/Users';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/cards/:testvalue" name="cards" component={CardsPage} />
                <Route path="/admin" component={Admin} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/users" exact component={Users} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;