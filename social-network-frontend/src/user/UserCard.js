import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
// import { Link } from "react-router-dom";
import DefaultProfileImg from "../img/default_avatar.png";
import { getUserDetail } from "../helpers/index";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import UpdateProfileImage from "./UpdateProfileImage";

export default class UserCard extends Component {
    render() {
        const { user, userIdURLParam } = this.props;
        // console.log("UserCard.userIdURLParam: ", userIdURLParam);
        const photoUrl = user._id
            ? `http://192.168.1.10:5000/user/photo/${
                  user._id
              }?${new Date().getTime()}`
            : DefaultProfileImg;
        return (
            <div className="card shadow-round-border m-0 p-0 mb-4">
                <img
                    className="rounded-circle mx-auto my-2 image-responsive img-profile-resize"
                    src={photoUrl}
                    alt="user avatar for user profile."
                ></img>
                {isAuthenticated().user._id === userIdURLParam ? (
                    <UpdateProfileImage
                        userId={userIdURLParam}
                        refresh={this.props.refresh}
                    />
                ) : (
                    ""
                )}

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
                {isAuthenticated().user._id === userIdURLParam ? (
                    <div
                        className="card-body d-flex justify-content-center"
                        style={{ hidden: "true" }}
                    >
                        <UpdateUser userID={userIdURLParam} />
                        <DeleteUser userID={userIdURLParam} />
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
