import React, { lazy, Suspense } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const App = lazy(() => import('./App/App'));

const Shell = () => (
    <Router>
        <Suspense fallback={<div>Loading</div>}>
            <Switch>
                <Route exact path='/app' component={App} />
                <Redirect to='/app' />
            </Switch>
        </Suspense>
    </Router>
);

export default Shell;