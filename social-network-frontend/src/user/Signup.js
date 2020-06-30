import React, { Component } from 'react'

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            forename: "",
            surname: "",
            email: "",
            password: "",
            password2: "",
            error: "",
            passwordAlert: ""
        };
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };
    confirmPassword = (password2) => (event) => {
        this.setState({password2: event.target.value});
        
        // console.log(this.state.password !== this.state.password2)
        if(password2){
            if(this.state.password !== this.state.password2)
                this.setState({passwordAlert: "is-invalid"});
            else
                this.setState({passwordAlert: "is-valid"});
        } else {
            this.setState({passwordAlert: ""});
        }
        console.log(this.state.password, this.state.password2);
    };

    submit = event => {
        // prevent page reload
        event.preventDefault();
        // destructure state data 
        const {forename, surname, email, password, password2, error} = this.state;
        // create user obj
        const user = {
            forename,
            surname,
            email,
            password,
            password2
        };
        // test inputs
        // console.log(user);
        // attempt signup request
        this.signup(user)
        .then(data => {
            if(data.error) this.setState({error: data.error})
        });
    };

    // make POST request to backend API - signup
    signup = user =>{
        return fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(user)
            }
        )
        .then(res => {return res.json()})
        .catch(err => console.log(err))
    };

    render() {
        const {forename, surname, email, password, password2, error, passwordAlert} = this.state;
        return (
            <div className="container">
                <h2 className="my-4">Signup</h2>
                <div
                    className="alert alert-warning"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                <form>
                    <div className="form-group">
                        <label>Forename</label>
                        <input 
                            onChange={this.handleChange("forename")} 
                            type="text" 
                            className="form-control" 
                            value={forename}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label >Surname</label>
                        <input 
                            onChange={this.handleChange("surname")} 
                            type="text" 
                            className="form-control" 
                            value={surname}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input 
                            onChange={this.handleChange("email")} 
                            type="email" 
                            className="form-control" 
                            value={email}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            onChange={this.handleChange("password")} 
                            type="password" 
                            className={"form-control "+{passwordAlert}}
                            value={password}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            onChange={this.confirmPassword("password2")}
                            type="password" 
                            className={"form-control "+passwordAlert} 
                            value={password2}
                            name="password2" 
                        ></input>
                    </div>
                    <button id="disabledInput"
                        onClick={this.submit} 
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                    <a 
                        href="/signin"
                        className="btn btn-secondary"
                    >
                        Sign In
                    </a>
                </form>
            </div>
        )
    }
}


