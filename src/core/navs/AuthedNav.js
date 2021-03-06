import React from "react";
import { Redirect, NavLink, withRouter } from "react-router-dom";
import { getUserDetail } from "../../helpers/index";
import { isAuthenticated, logout } from "../../auth/index";

const isAuthSession = () => {
    if (!isAuthenticated()) return <Redirect to="/login" />;
};

const AuthedNav = ({ history }) => (
    <div>
        {isAuthSession()}
        <nav className="navbar navbar-sm navbar-expand-lg navbar-dark bg-primary fixed-top py-2 mb-4">
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

            <div className="collapse navbar-collapse" id="navbarColor01">
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
                <div className="navbar-nav nav-item dropdown pull-right ">
                    <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {getUserDetail("forename")}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right bg-white ">
                        <NavLink
                            className="dropdown-item"
                            to={"user/" + getUserDetail("_id")}
                        >
                            <i
                                className="fa fa-user-o primary"
                                aria-hidden="true"
                            ></i>{" "}
                            Profile
                        </NavLink>
                        <NavLink className="dropdown-item" to="#">
                            <i
                                className="fa fa-book primary"
                                aria-hidden="false"
                            ></i>{" "}
                            Bookings
                        </NavLink>
                        <div className="dropdown-divider bg-white secondary"></div>
                        <NavLink
                            className="dropdown-item"
                            to="#"
                            onClick={() => logout()}
                        >
                            <i className="fa fa-sign-out-alt bg-white secondary"></i>{" "}
                            Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
        <div className="clear"></div>
    </div>
);

export default withRouter(AuthedNav);
