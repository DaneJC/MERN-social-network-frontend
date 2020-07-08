import React, { Component } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
    render() {
        const { post } = this.props;
        console.log(`Post.render(): {\n\tpost: ${post}\n}`);
        function hasReceiver() {
            if (post.receiver) {
                return (
                    <div>
                        <span>{   }</span>
                        <Link
                            className="link"
                            to={`/user/${post.receiver._id}`}
                        >{`${post.receiver.forename} ${post.receiver.surname}`}</Link>
                    </div>
                );
            }
        }

        return (
            // <div className="col ">
            // {console.log("in")}
            <div className="card shadow-round-border p-2 mb-4 bg-grey">
                <div className="card" style={{ maxwidth: "20rem" }}>
                    <div className="card-header font-weight-bold bg-white">
                        <img
                            className="rounded-circle mr-2"
                            style={{
                                height: "1.5rem",
                                width: "1.5rem",
                                display: "inline",
                            }}
                            src={require("../img/default_avatar.png")}
                            alt="users profile picture."
                        ></img>
                        <Link
                            className="link"
                            to={`/user/${post.author._id}`}
                        >{`${post.author.forename} ${post.author.surname}`}</Link>
                        {hasReceiver()}
                        &nbsp;
                        <span className="blockquote-footer small d-inline">
                            {` ${new Date(
                                post.created
                            ).toDateString()} ${new Date(
                                post.created
                            ).toLocaleTimeString()}`}
                        </span>
                    </div>
                    <div className="card-body">
                        {/* <h4>{post.title}</h4> */}
                        <p className="card-text">{post.body}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
