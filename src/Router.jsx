import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ROUTES } from './utils/constants/routes';
import { Home, Gallery, CreateNFT } from './pages'


function Routes(){

    return (
        <Router>
            <Switch>
                <Route exact path={ROUTES.home}>
                    <Home />
                </Route>
                <Route path={ROUTES.gallery}>
                    <Gallery />
                </Route>
                <Route path={ROUTES.createNFT}>
                    <CreateNFT />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;