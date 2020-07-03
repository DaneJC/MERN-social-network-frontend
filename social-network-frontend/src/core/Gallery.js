import React from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./navs/AuthedNav";

const Gallery = () => (
    
    <div>
        <AuthedNav/>
        <div className="jumbotron">
            <p className="lead">Gallery</p>
        </div>
    </div>
);

export default Gallery;