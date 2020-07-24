import React from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./core/navs/AuthedNav";

const Booking = () => (
    <div>
        <AuthedNav />
        <div className="jumbotron">
            <p className="lead">Booking</p>
        </div>
    </div>
);

export default Booking;
