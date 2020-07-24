import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import UnauthedNav from "../core/navs/UnauthedNav";

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            error: "",
            email: "",
            password: "",
            redirect: false,
        };
        console.log(process.env.REACT_APP_API_URL);
    }
    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
        this.setState({ error: "" });
    };
    submit = (event) => {
        // prevent page reload
        event.preventDefault();
        // destructure state data
        const { email, password } = this.state;
        // create user obj
        const user = {
            email,
            password,
        };
        // test statement - inputs
        // console.log(user);
        // attempt login request
        this.signin(user).then((data) => {
            if (data)
                if (data.error) {
                    this.setState({ error: data.error });
                    this.setState({ password: "" });
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
    signin = (user) => {
        return fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
        const { error, email, password, redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }

        function errorCheckAt(input) {
            if (error) if (error.param === input) return "is-invalid ";
        }

        return (
            <div>
                <UnauthedNav />
                <div className="container col-sm-7 col-md-5 col-xl-3 my-4 pb-5 px-5 border rounded-lg shadow">
                    <h2 className="my-4 d-flex justify-content-center ">
                        Login&nbsp;
                        <i className="fas fa-sign-in-alt"></i>
                    </h2>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input
                            onChange={this.handleChange("email")}
                            type="email"
                            className={"form-control " + errorCheckAt("email")}
                            value={email}
                        ></input>
                        <div
                            className="invalid-feedback"
                            style={{
                                display: error.param === "email" ? "" : "none",
                            }}
                        >
                            {error.msg}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
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
                                    error.param === "password" ? "" : "none",
                            }}
                        >
                            {error.msg}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={this.submit}
                            className="btn btn-outline-primary "
                        >
                            Login
                        </button>
                        <Link
                            to="/signup"
                            className="btn btn-outline-secondary"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
