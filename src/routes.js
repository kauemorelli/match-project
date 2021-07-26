import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './components/Main';
import CardsPage from './components/Main/CardsPage';
import Admin from './components/Admin';
import Dashboard from './components/Admin/Dashboard';
import Users from './components/Admin/Users';
import Departaments from './components/Admin/Departaments';
import Campaign from './components/Admin/Campaign';
import Reports from './components/Admin/';
import { getDataToken } from './api/apiToken';

function Routes() {

    useEffect(() => {
        async function token() {
            let dataToken;

            await getDataToken().then(res => {
                dataToken = res;
            });

            return dataToken;
        }

        token();
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/cards/:testvalue" name="cards" component={CardsPage} />
                <Route path="/admin" component={Admin} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/users" exact component={Users} />
                <Route path="/departaments" exact component={Departaments} />
                <Route path="/reports" exact component={Reports} />
                <Route path="/campaign" exact component={Campaign} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;