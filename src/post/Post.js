import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../img/default_avatar.png";
import { unlike, like, comment } from "./PostAPI";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { isAuthenticated } from "../auth/index";
import socket from "../socketIO/socket";
import DeletePost from "./DeletePost";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            liked: false,
            likes: props.post.likes.length,
            comments: props.post.comments,
            showComments: false,
        };
    }

    componentDidMount() {
        let { post } = this.state;
        this.setState({ liked: this.isLiked(post.likes) });
        socket.on("newLike", (postId) => {
            if (postId === this.state.post._id)
                this.setState({ likes: ++this.state.likes });
        });
        socket.on("newUnlike", (postId) => {
            if (postId === this.state.post._id)
                this.setState({ likes: --this.state.likes });
        });
        socket.on("newComment", (data) => {
            if (data._id === this.state.post._id) {
                this.setState({ comments: data.comments });
                // console.log(this.state.comments);
            }
        });
    }

    isLiked = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    toggleLike = () => {
        let callApi = this.state.liked ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(userId, token, postId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    liked: !this.state.liked,
                    likes: data.likes.length,
                });
                console.log(this.state.liked);
            }
        });
    };

    toggleComments = () => {
        this.setState({
            showComments: !this.state.showComments,
        });
    };

    displayComments() {
        const { showComments, comments, post } = this.state;
        if (showComments) {
            if (comments)
                return (
                    <div>
                        {comments.length > 0 ? <hr></hr> : ""}
                        {comments.map((comment) => {
                            // if (comment.author)
                            return (
                                <Comment key={comment._id} comment={comment} />
                            );
                        })}
                        <CreateComment postId={post._id} />
                    </div>
                );
        }
    }

    updateComments = (comments) => {
        this.setState({ comments });
    };

    // displayOptions = () => {
    //     const { post } = this.state;
    //     try {
    //         if (post)
    //             if (
    //                 post.author._id === isAuthenticated().user._id ||
    //                 post.receiver._id === isAuthenticated().user._id
    //             ) {
    //                 return (
    //                     <div className="ml-auto p-2">
    //                         <i
    //                             className="fa fa-ellipsis-v text-muted"
    //                             aria-hidden="true"
    //                             data-toggle="dropdown"
    //                             aria-haspopup="true"
    //                             aria-expanded="false"
    //                         ></i>
    //                         <div className="dropdown-menu dropdown-menu-right">
    //                             <span className="dropdown-item">
    //                                 <i
    //                                     className="fa fa-pencil secondary"
    //                                     aria-hidden="true"
    //                                 ></i>
    //                                 &nbsp;Edit
    //                             </span>
    //                             <DeletePost postId={post._id} />
    //                         </div>
    //                     </div>
    //                 );
    //             }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    render() {
        const { post, liked, likes, comments } = this.state;
        // console.log(`Post.render(): {\n\tpost: ${post}\n}`);

        var photoUrl = DefaultProfileImg;
        try {
            if (post.author._id)
                photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${
                    post.author._id
                }?${new Date().getTime()}`;
        } catch (err) {
            // console.log(err);
        }

        function hasReceiver() {
            try {
                if (post.author._id !== post.receiver._id)
                    return (
                        <div className="text-muted d-inline">
                            {` -> `}
                            {/* <i class="fa fa-long-arrow-right" aria-hidden="true"></i> */}
                            <Link
                                className="secondary d-inline"
                                to={`/user/${post.receiver._id}`}
                            >{`${post.receiver.forename} ${post.receiver.surname}`}</Link>
                        </div>
                    );
            } catch (err) {
                // console.log(err);
            }
        }
        function isLiked() {
            if (liked) return "fa fa-thumbs-o-up secondary";
            else return "fa fa-thumbs-o-up";
        }

        function commentCount() {
            try {
                return comments.length > 0 ? " " + comments.length : "";
            } catch (err) {
                // console.log(err);
            }
        }
        function displayOptions() {
            // const { post } = this.state;
            try {
                if (post)
                    if (
                        post.author._id === isAuthenticated().user._id ||
                        post.receiver._id === isAuthenticated().user._id
                    ) {
                        return (
                            <div className="ml-auto p-2">
                                <i
                                    className="fa fa-ellipsis-v text-muted"
                                    aria-hidden="true"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                ></i>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <span className="dropdown-item">
                                        <i
                                            className="fa fa-pencil secondary"
                                            aria-hidden="true"
                                        ></i>
                                        &nbsp;Edit
                                    </span>
                                    <DeletePost postId={post._id} />
                                </div>
                            </div>
                        );
                    }
            } catch (err) {
                console.log(err);
            }
        }

        return (
            <div
                className="card shadow-round-border p-2 mb-4"
                style={{ maxwidth: "20rem" }}
            >
                <div className="d-flex">
                    <div className="px-1 py-2 font-weight-bold bg-white d-inline ">
                        <img
                            className="rounded-circle mr-2 img-post-author-resize"
                            src={photoUrl}
                            alt="user profiler."
                        ></img>
                        <Link
                            className="secondary d-inline"
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
                    {displayOptions()}
                </div>

                <hr></hr>
                <div className="py-3 px-3">
                    <p className="card-text">{post.body}</p>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-around text-muted p-2 bg-white">
                    <i
                        className={isLiked() + " i-like"}
                        aria-hidden="true"
                        onClick={this.toggleLike}
                    >
                        {likes > 0 ? " " + likes : ""}
                    </i>
                    <i
                        className="fa fa-comment-o i-comment"
                        aria-hidden="true"
                        onClick={this.toggleComments}
                    >
                        {commentCount()}
                    </i>
                    <i className="fa fa-heart-o i-love" aria-hidden="true"></i>
                </div>
                {this.displayComments()}
            </div>
        );
    }
}
