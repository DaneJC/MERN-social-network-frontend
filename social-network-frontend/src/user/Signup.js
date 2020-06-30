import React, { Component } from 'react'

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
            
        }
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };

    render() {
        return (
            <div className="container">
                <h2 className="my-5">Signup</h2>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password}></input>
                    </div>
                    <button className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}


