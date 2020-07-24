import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { remove } from "./UserAPI";
import { logout } from "../auth";

export default class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                logout(() => console.log("User is deleted"));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };

    render() {
        // console.log(this.props.userId);
        if (this.state.redirect) {
            return <Redirect to="/signup" />;
        }
        return (
            <span className="mx-2">
                <Link
                    className="card-link primary bg-white"
                    to="#"
                    data-toggle="modal"
                    data-target="#confirmDelete"
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
                </Link>
                <div
                    className="modal fade "
                    id="confirmDelete"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered "
                        role="document"
                    >
                        <div className="modal-content round">
                            <div className="modal-header">
                                <h5
                                    className="modal-title primary"
                                    id="exampleModalCenterTitle"
                                >
                                    Delete Profile
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete your account?..
                                It would be a shame to see you go!
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={this.deleteAccount}
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger btn-danger-loud btn-secondary"
                                    data-dismiss="modal"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}
