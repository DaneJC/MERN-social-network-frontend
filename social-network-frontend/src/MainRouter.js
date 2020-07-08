import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./user/Profile";
import Home from "./core/Home";
import NewsFeed from "./NewsFeed";
import Gallery from "./Gallery";
import Booking from "./Booking";
import Contact from "./Contact";
import About from "./About";

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/user/:userId" component={Profile}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/newsfeed" component={NewsFeed}></Route>
            <Route exact path="/gallery" component={Gallery}></Route>
            <Route exact path="/booking" component={Booking}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/about" component={About}></Route>
        </Switch>
    </div>
);

export default MainRouter;
