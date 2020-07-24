import React from "react";
import AuthedNav from "./navs/AuthedNav";
import { getUserDetail } from "../helpers/index";

const Home = () => (
    
    <div>
        <AuthedNav/>
        <div className="jumbotron">
            <p className="lead">Welcome {getUserDetail("forename")}!</p>
        </div>
    </div>
);

export default Home;