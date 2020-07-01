import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from './core/Home';
import Signup from './user/Signup';
import Login from './user/Login';

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/login" component={Login}></Route>
        </Switch>
    </div>
)

export default MainRouter;

