import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { remove } from "./PostAPI";

export default class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.postId;
    }
    deletePost = () => {
        const token = isAuthenticated().token;
        remove(this.postId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log("Post deleted.");
            }
        });
    };

    render() {
        return (
            <span className="mx-2">
                <a
                    className="card-link dropdown-item "
                    href="#"
                    data-toggle="modal"
                    data-target="#confirmDeletePost"
                >
                    <i className="fa fa-trash-o primary" aria-hidden="true"></i>
                    &nbsp;Delete
                </a>
                <div
                    className="modal fade "
                    id="confirmDeletePost"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="deletePostTitle"
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
                                    id="deletePostTitle"
                                >
                                    Delete Post
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
                                Are you sure you want to delete this post?
                            </div>
                            <div className="modal-footer">
                                <button
                                    // onClick={() => {
                                    //     this.deletePost();
                                    // }}
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
