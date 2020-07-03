import React from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./navs/AuthedNav";

const NewsFeed = () => (
    
    <div>
        <AuthedNav/>
        <div className="jumbotron">
            <p className="lead">NewsFeed</p>
        </div>
    </div>
);

export default NewsFeed;