import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Home from "./core/Home";
import NewsFeed from "./core/NewsFeed";
import Gallery from "./core/Gallery";
import Booking from "./core/Booking";
import Contact from "./core/Contact";
import About from "./core/About";

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/newsfeed" component={NewsFeed}></Route>
            <Route exact path="/gallery" component={Gallery}></Route>
            <Route exact path="/booking" component={Booking}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/about" component={About}></Route>
        </Switch>
    </div>
);

export default MainRouter;
