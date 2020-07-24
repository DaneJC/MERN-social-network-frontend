import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
// import { isAuthUser } from "../auth";
// import { remove } from "./UserAPI";
// import { logout } from "../auth";

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {
        // console.log(this.props.userId);
        if (this.state.redirect) {
            return <Redirect to="/signup" />;
        }
        return (
            <span className="mx-2">
                <Link
                    to="#"
                    data-toggle="modal"
                    data-target="#updateModal"
                    className="card-link secondary"
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                </Link>

                <div
                    className="modal fade "
                    id="updateModal"
                    tabIndex="-1"
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
                                    Edit Profile
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
                                Edit you profile using the forms below:
                                {/* <form>
                                    <div className="form-group ">
                                        <label>Forename</label>
                                        <input
                                            onChange={this.handleChange(
                                                "forename"
                                            )}
                                            type="text"
                                            className={
                                                "form-control " +
                                                errorCheckAt("forename")
                                            }
                                            value={forename}
                                        ></input>
                                        <div
                                            className="invalid-feedback"
                                            style={{
                                                display:
                                                    error.param === "forename"
                                                        ? ""
                                                        : "none",
                                            }}
                                        >
                                            {error.msg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Surname</label>
                                        <input
                                            onChange={this.handleChange(
                                                "surname"
                                            )}
                                            type="text"
                                            className={
                                                "form-control " +
                                                errorCheckAt("surname")
                                            }
                                            value={surname}
                                        ></input>
                                        <div
                                            className="invalid-feedback"
                                            style={{
                                                display:
                                                    error.param === "surname"
                                                        ? ""
                                                        : "none",
                                            }}
                                        >
                                            {error.msg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            onChange={this.handleChange(
                                                "email"
                                            )}
                                            type="email"
                                            className={
                                                "form-control " +
                                                errorCheckAt("email")
                                            }
                                            value={email}
                                        ></input>
                                        <div
                                            className="invalid-feedback"
                                            style={{
                                                display:
                                                    error.param === "email"
                                                        ? ""
                                                        : "none",
                                            }}
                                        >
                                            {error.msg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            onChange={this.handleChange(
                                                "password"
                                            )}
                                            type="password"
                                            className={
                                                "form-control " +
                                                errorCheckAt("password")
                                            }
                                            value={password}
                                        ></input>
                                        <div
                                            className="invalid-feedback"
                                            style={{
                                                display:
                                                    error.param === "password"
                                                        ? ""
                                                        : "none",
                                            }}
                                        >
                                            {error.msg}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                            onChange={this.handleChange(
                                                "password2"
                                            )}
                                            onKeyUp={this.confirmPassword(
                                                "password2"
                                            )}
                                            type="password"
                                            className={
                                                "form-control " +
                                                password2AlertCSS
                                            }
                                            value={password2}
                                            name="password2"
                                        ></input>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            onClick={this.submit}
                                            className={
                                                "btn btn-primary " +
                                                submitBtnCSS
                                            }
                                            disabled={submitBtnDisabled}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form> */}
                            </div>
                            <div className="modal-footer">
                                <button
                                    // onClick={this.deleteAccount}
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}
