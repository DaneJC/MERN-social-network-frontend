import React from "react";
import { Redirect, NavLink, withRouter } from "react-router-dom";
import { getUserDetail } from "../../helpers/index";
import { isAuthUser, logout } from "../../auth/index";

const isAuthSession = () => {
    if (!isAuthUser()) return <Redirect to="/login" />;
};

const AuthedNav = ({ history }) => (
    <div>
        {isAuthSession()}
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
                <div className="navbar-nav nav-item dropdown pull-right">
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
                    <div className="dropdown-menu primary">
                        <NavLink className="dropdown-item" to={"user/"+getUserDetail("_id")}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                            Profile
                        </NavLink>
                        <NavLink className="dropdown-item" to="#">
                            <i className="fa fa-book" aria-hidden="false"></i>{" "}
                            Bookings
                        </NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink
                            className="dropdown-item"
                            to="#"
                            onClick={() => logout()}
                        >
                            <i className="fa fa-sign-out-alt"></i> Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    </div>
);

export default withRouter(AuthedNav);
