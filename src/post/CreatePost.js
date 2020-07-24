import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { create } from "../post/PostAPI";

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIdURLParam: this.props.userIdURLParam,
            body: "",
            // photo: "",
            error: "",
            user: {},
            receiver: null,
            // fileSize: 0,
            // loading: false,
        };
    }
    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
        this.isProfilePost();

        // console.log("this.props.profileUserId: ", this.props.profileUserId);
    }
    /**
     * isProfilePost() - determins if the created post is a newsfeed post or user profile post,
     * sets the posts receiver id to this.props.profileUserId (user/:userId URL param).
     */
    isProfilePost = () => {
        if (
            this.state.userIdURLParam !== null &&
            this.state.userIdURLParam !== isAuthenticated().user._id
        )
            this.postData.set("receiver", this.state.userIdURLParam);
    };

    isValid = () => {
        // const { title, body, fileSize } = this.state;
        // if (fileSize > 100000) {
        //     this.setState({
        //         error: "File size should be less than 100kb",
        //         loading: false
        //     });
        //     return false;
        // }
        if (this.state.body.length === 0) {
            this.setState({ error: "Post content required." });
            return false;
        }
        return true;
    };

    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        console.log(this.postData);
        // this.setState({ [name]: value, fileSize });
        this.setState({ [name]: value });
    };

    clickSubmit = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            // if URL contains a userId then user is posting to a user profile page
            console.log(this.postData);
            create(userId, token, this.postData).then((data) => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        body: "",
                    });
                }
            });
        }
    };

    render() {
        const { body, error } = this.state;

        function errorCheckAt(input) {
            if (error) return "is-invalid ";
        }

        return (
            <form>
                <div className="card shadow-round-border p-2 mb-4 bg-grey">
                    <div className="input-group bg-light rounded-lg">
                        <div className="input-group-prepend primary ">
                            <div className="input-group-text bg-white p-1">
                                <h4 className="m-0 p-0 ">
                                    <i
                                        className="fa fa-pencil-square-o primary m-0 p-0 pl-3 pr-1 "
                                        aria-hidden="true"
                                    ></i>
                                </h4>
                            </div>
                        </div>

                        <textarea
                            type="text"
                            rows="3"
                            onChange={this.handleChange("body")}
                            className={
                                "form-control p-1 my-2 rounded-lg bg-grey" +
                                errorCheckAt("body")
                            }
                            placeholder="Say something?."
                            value={body}
                        ></textarea>
                        <div
                            className="invalid-feedback"
                            style={{
                                display:
                                    error.param === "forename" ? "" : "none",
                            }}
                        >
                            {error.msg}
                        </div>
                        <div className="input-group-append ">
                            <div className="input-group-text p-0 bg-white">
                                <button
                                    className="btn m-0 p-0 px-3"
                                    onClick={this.clickSubmit}
                                >
                                    <h4 className="m-0 p-0 i-send">
                                        <i
                                            className="fa fa-paper-plane-o secondary m-0 p-0"
                                            aria-hidden="true"
                                        ></i>
                                    </h4>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
