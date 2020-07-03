import React from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./navs/AuthedNav";

const About = () => (
    
    <div>
        <AuthedNav/>
        <div className="jumbotron">
            <p className="lead">About</p>
        </div>
    </div>
);

export default About;