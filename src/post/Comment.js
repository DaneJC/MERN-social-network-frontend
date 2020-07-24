import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../img/default_avatar.png";
import { unlike, like } from "./PostAPI";
import { isAuthenticated } from "../auth/index";

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment,
            liked: false,
            // likes: props.comment.likes.length,
        };
    }
    // componentWillMount() {
    // static getDerivedStateFromProps(props, state) {
    // const { post } = props.post;
    // return {
    // post: props.post,
    // liked: this.isLiked(props.post.likes),
    // likes: props.post.likes.length,
    // };
    // }

    // componentDidMount() {
    //     let { comment } = this.state;
    //     this.setState({ liked: this.isLiked(comment.likes) });
    // }

    // isLiked = (likes) => {
    //     const userId = isAuthenticated() && isAuthenticated().user._id;
    //     let match = likes.indexOf(userId) !== -1;
    //     return match;
    // }

    // toggleLike = () => {
    //     let callApi = this.state.liked ? unlike : like;
    //     const userId = isAuthenticated().user._id;
    //     const postId = this.state.post._id;
    //     const token = isAuthenticated().token;

    //     callApi(userId, token, postId).then((data) => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             this.setState({
    //                 liked: !this.state.liked,
    //                 likes: data.likes.length,
    //             });
    //             console.log(this.state.liked);
    //         }
    //     });
    // };

    updateComments = (comments) => {
        this.setState({ comments });
    };

    render() {
        const { comment, liked, likes } = this.state;

        var photoUrl = DefaultProfileImg;
        try {
            if (comment.postedBy._id)
                photoUrl = `${process.env.API_URI}/user/photo/${
                    comment.postedBy._id
                }?${new Date().getTime()}`;
        } catch (err) {
            // console.log(err);
        }

        function isLiked() {
            if (liked) return "fa fa-thumbs-o-up secondary";
            else return "fa fa-thumbs-o-up";
        }

        function athorAndContent() {
            try {
                return (
                    <div
                        className="bg-grey  py-2 px-3 "
                        style={{ borderRadius: "2rem" }}
                    >
                        <Link
                            className="d-inline font-weight-bold"
                            to={`/user/${comment.postedBy._id}`}
                        >{`${comment.postedBy.forename} ${comment.postedBy.surname}`}</Link>
                        <p className="card-text">{comment.text}</p>
                    </div>
                );
            } catch (err) {
                console.log(err);
            }
        }

        return (
            <div className="my-3 mx-2">
                {/* <hr className="m-0 mb-2 p-0"></hr> */}
                <div className="d-flex flex-row">
                    <img
                        className="rounded-circle mr-1 mt-1 img-post-author-resize "
                        src={photoUrl}
                        alt="."
                    ></img>
                    <div className="flex-fill">
                        {athorAndContent()}
                        <div className=" text-muted mx-2 ">
                            <i
                                className={`ml-1 mr-3 ${isLiked()} i-like`}
                                aria-hidden="true"
                                // onClick={this.toggleLike}
                            >
                                {likes > 0 ? " " + likes : ""}
                            </i>
                            <i
                                className="fa fa-heart-o mr-3 i-love"
                                aria-hidden="true"
                            ></i>
                            <span className="small d-inline">
                                {` ${new Date(
                                    comment.created
                                ).toDateString()} ${new Date(
                                    comment.created
                                ).toLocaleTimeString()}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}
