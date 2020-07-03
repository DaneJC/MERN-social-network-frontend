import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import UnauthedNav from "../core/navs/UnauthedNav";

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
            forename: "", // forename, surname, email + password: validated API side - error response
            surname: "",
            email: "",
            password: "",
            password2: "",
            password2AlertCSS: "", // confirm password: validated client side - 2 way binding
            submitBtnCSS: "disabled ",
            submitBtnDisabled: true,
            redirect: false,
        };
    }

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
        this.setState({ error: "" });
    };

    confirmPassword = (password2) => (event) => {
        // console.log(this.state.password2, event.target.value);
        if (password2) {
            if (this.state.password !== this.state.password2) {
                this.setState({ password2AlertCSS: "is-invalid " });
                this.disableSubmitBtn();
            } else {
                this.setState({ password2AlertCSS: "is-valid " });
                this.enableSubmitBtn();
            }
        } else {
            this.setState({ password2AlertCSS: " " });
            this.disableSubmitBtn();
        }
        console.log(this.state.submitBtnEnabled, this.state.submitBtnCSS);
    };

    enableSubmitBtn() {
        this.setState({ submitBtnDisabled: false });
        this.setState({ submitBtnCSS: " " });
    }

    disableSubmitBtn() {
        this.setState({ submitBtnDisabled: true });
        this.setState({ submitBtnCSS: "disabled " });
    }

    submit = (event) => {
        // prevent page reload
        event.preventDefault();
        // destructure state data
        const { forename, surname, email, password, password2 } = this.state;
        // create user obj
        const user = {
            forename,
            surname,
            email,
            password,
            password2,
        };
        // test statement - inputs
        // console.log(user);
        // attempt signup request
        this.signup(user).then((data) => {
            if (data)
                if (data.error) {
                    this.setState({ error: data.error });
                    this.setState({ password2: "" });
                    this.setState({ password2AlertCSS: "" });
                } else {
                    // authnticate user
                    this.authenticate(data, () => {
                        // redirect to home page
                        this.setState({ redirect: true });
                    });
                }
        });
    };

    // make POST request to backend API - signup
    signup = (user) => {
        return fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => {
                return res.json();
            })
            .catch((err) => console.log(err));
    };

    authenticate(jwt, next) {
        if (typeof window !== undefined) {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    }

    render() {
        const {
            error,
            forename,
            surname,
            email,
            password,
            password2,
            password2AlertCSS,
            submitBtnDisabled,
            submitBtnCSS,
            redirect,
        } = this.state;

        // if user authenticated redirect to home page
        if (redirect) {
            return <Redirect to="/" />;
        }

        function errorCheckAt(input) {
            if (error) if (error.param === input) return "is-invalid ";
        }

        return (
            <div>
                <UnauthedNav/>
                <div className="container">
                    <h2 className="my-4">
                        Signup&nbsp;
                        <i className="fas fa-user-plus"></i>
                    </h2>

                    <form>
                        <div className="form-group ">
                            <label>Forename</label>
                            <input
                                onChange={this.handleChange("forename")}
                                type="text"
                                className={
                                    "form-control " + errorCheckAt("forename")
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
                                onChange={this.handleChange("surname")}
                                type="text"
                                className={
                                    "form-control " + errorCheckAt("surname")
                                }
                                value={surname}
                            ></input>
                            <div
                                className="invalid-feedback"
                                style={{
                                    display:
                                        error.param === "surname" ? "" : "none",
                                }}
                            >
                                {error.msg}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                onChange={this.handleChange("email")}
                                type="email"
                                className={
                                    "form-control " + errorCheckAt("email")
                                }
                                value={email}
                            ></input>
                            <div
                                className="invalid-feedback"
                                style={{
                                    display:
                                        error.param === "email" ? "" : "none",
                                }}
                            >
                                {error.msg}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                onChange={this.handleChange("password")}
                                type="password"
                                className={
                                    "form-control " + errorCheckAt("password")
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
                                onChange={this.handleChange("password2")}
                                onKeyUp={this.confirmPassword("password2")}
                                type="password"
                                className={"form-control " + password2AlertCSS}
                                value={password2}
                                name="password2"
                            ></input>
                        </div>
                        <button
                            onClick={this.submit}
                            className={"btn btn-primary " + submitBtnCSS}
                            disabled={submitBtnDisabled}
                        >
                            Submit
                        </button>
                        <Link to="/login" className="btn btn-secondary">
                            Login
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}
