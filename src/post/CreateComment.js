import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { comment } from "../post/PostAPI";

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            // photo: "",
            error: "",
        };
    }

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long",
            });
            return false;
        }
        return true;
    };

    handleChange = () => (event) => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    clickSubmit = (event) => {
        event.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, { text: this.state.text }).then(
                (data) => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });
                    }
                }
            );
        }
    };

    render() {
        const { text, error } = this.state;

        function errorCheckAt(input) {
            if (error) return "is-invalid ";
        }

        return (
            <form>
                <div className="">
                    <div className="input-group bg-light ">
                        <div
                            className="input-group-prepend primary "
                            style={{ borderRadius: "2rem" }}
                        >
                            <div className="input-group-text bg-white p-1">
                                <h5 className="m-0 p-0 ">
                                    <i
                                        className="fa fa-pencil-square-o primary m-0 p-0 pl-3 pr-1 "
                                        aria-hidden="true"
                                    ></i>
                                </h5>
                            </div>
                        </div>

                        <textarea
                            type="text"
                            rows="2"
                            onChange={this.handleChange("text")}
                            className={
                                "form-control  p-1 my-2 rounded-lg " +
                                errorCheckAt("text")
                            }
                            placeholder="Comment..."
                            value={text}
                        ></textarea>
                        <div
                            className="invalid-feedback"
                            style={{
                                display: error.param === "text" ? "" : "none",
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
                                    <h5 className="m-0 p-0 i-send">
                                        <i
                                            className="fa fa-paper-plane-o secondary m-0 p-0"
                                            aria-hidden="true"
                                        ></i>
                                    </h5>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
