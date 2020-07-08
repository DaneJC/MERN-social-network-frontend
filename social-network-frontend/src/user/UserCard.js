import React, { Component } from "react";
import { isAuthUser } from "../auth/index";
import { Link } from "react-router-dom";
import { getUserDetail } from "../helpers/index";

export default class UserCard extends Component {
    render() {
        const { user } = this.props;
        // console.log("user", user);
        return (
            <div className="card  shadow-round-border mb-4 ">
                <img
                    className="rounded-circle mx-auto my-2"
                    style={{
                        height: "10rem",
                        width: "10rem",
                        display: "block",
                    }}
                    src={require("../img/default_avatar.png")}
                    alt="default user avatar for user profile."
                ></img>
                <h3 className="card-header text-center secondary">
                    {`${user.forename} ${user.surname}`}
                </h3>
                <div className="card-body">
                    <span className="text-primary text-bold">
                        About: &nbsp;
                    </span>
                    <p className="card-text ">...</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="text-primary text-bold">
                            From: &nbsp;
                        </span>
                        <span className="text-muted">
                            Letterkenny, Co.Donegal.
                        </span>
                    </li>
                    <li className="list-group-item">
                        <span className="text-primary text-bold">
                            Joined: &nbsp;
                        </span>
                        <span className="text-muted">
                            {`${new Date(user.created).toDateString()}`}
                        </span>
                    </li>
                </ul>
                <div
                    className="card-body"
                    style={{
                        display:
                            getUserDetail("_id") === user._id
                                ? ""
                                : "none",
                    }}
                >
                    <Link to="#" className="card-link secondary">
                        Edit
                    </Link>
                    <Link to="#" className="card-link primary">
                        Delete
                    </Link>
                </div>
            </div>
        );
    }
}
