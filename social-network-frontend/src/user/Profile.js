import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthedNav from "../core/navs/AuthedNav";
import { getUserDetail } from "../helpers/index";
import { isAuthUser } from "../auth/index";
import { defaultProfileImg } from "../img/default_avatar.png";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        };
    }
    // componentDidMount() - Called immediately after a component is mounted.
    // Setting state here will trigger re-rendering.
    componentDidMount() {
        // get userId from URL <userID> param
        const userId = this.props.match.params.userId;

        // fetch/request the user profile associated with userId from API
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    isAuthUser() ? isAuthUser().token : ""
                }`,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data)
                    if (data.error) console.log(data.error);
                    else this.setState({ user: data });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                {/* {console.log(this.state.user)} */}
                <AuthedNav />
                <div className="row col-lg-10 pt-4 mx-0 px-0 m-lg-auto ">
                    <div className="col-sm-5 col-md-4 col-md-5 pr-sm-0">
                        <div className="card mb-3 shadow">
                            <img
                                className="rounded-circle mx-auto mt-2"
                                style={{
                                    height: "10rem",
                                    width: "10rem",
                                    display: "block",
                                }}
                                src={require("../img/default_avatar.png")}
                                alt="default user avatar for user profile."
                            ></img>
                            <h3 className="card-header text-center">
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
                                        {`${new Date(
                                            user.created
                                        ).toDateString()}`}
                                    </span>
                                </li>
                            </ul>
                            <div
                                className="card-body"
                                style={{
                                    display:
                                        !isAuthUser().user &&
                                        isAuthUser().user._id !==
                                            this.state.user._id
                                            ? "none"
                                            : "",
                                }}
                            >
                                <Link to="#" className="card-link text-info">
                                    Edit
                                </Link>
                                <Link to="#" className="card-link text-danger">
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col ">
                        <div
                            className="card bg-secondary mb-4 shadow"
                            style={{ maxwidth: "20rem" }}
                        >
                            <div className="card-header font-weight-bold">
                                {`${user.forename} ${user.surname}`}
                            </div>
                            <div className="card-body">
                                {/* <h4 class="card-title">Secondary card title</h4> */}
                                <p className="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
