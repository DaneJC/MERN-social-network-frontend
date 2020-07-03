import React from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./navs/AuthedNav";

const Home = () => (
    
    <div>
        <AuthedNav/>
        <div className="jumbotron">
            <p className="lead">Welcome to Enhance Nails</p>
        </div>
    </div>
);

export default Home;