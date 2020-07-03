import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

// const isActiveLink = (history, path) => {
//     if(history.location.path === path)
//         return "nav-item ";
//     else return " ";
// }

const AuthedNav = ({ history }) => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <NavLink className="navbar-brand" to="/">
                ENHANCE
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/newsfeed"
                            activeClassName="active"
                        >
                            NewsFeed
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/gallery"
                            activeClassName="active"
                        >
                            Gallery
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/booking"
                            activeClassName="active"
                        >
                            Booking
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/contact"
                            activeClassName="active"
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/about"
                            activeClassName="active"
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

export default withRouter(AuthedNav);
