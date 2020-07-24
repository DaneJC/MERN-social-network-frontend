import React, { Component } from "react";
import AuthedNav from "../core/navs/AuthedNav";
import { isAuthenticated } from "../auth/index";
import { listByUser } from "../post/PostAPI";
import { readUser } from "../user/UserAPI";
import CreatePost from "../post/CreatePost";
import Post from "../post/Post";
import UserCard from "../user/UserCard";
import socket from "../socketIO/socket";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIdURLParam: this.props.match.params.userId,
            user: "",
            posts: [],
        };
        // this.init();
    }
    // componentDidMount() - Called immediately after a component is mounted.
    // Setting state here will trigger re-rendering.
    componentDidMount() {
        this.init();
        // store initial userId URL param in state to detect <Post> Link clicked [author | receiver]
        socket.on("newPost", (newPost) => {
            const token = isAuthenticated().token;
            readUser(newPost.receiver, token).then((data) => {
                if (data && data.error) {
                    console.log(data.error);
                } else {
                    newPost.receiver = {
                        _id: newPost.receiver,
                        forename: data.forename,
                        surname: data.surname,
                    };
                    let _posts = this.state.posts;
                    _posts.unshift(newPost);
                    this.setState({ posts: _posts });
                    console.log(newPost);
                }
                // console.log("user data: ", data);
            });
        });
    }
    /**
     * componentDidUpdate() - required to detect component updates and trigger re-rendering of
     * <Profile> and child components <UserCard | CreatePost | Post> when new post is submitted or
     * <Profile> URL userId param update (<Post> Link clicked [author | receiver]).
     */
    componentDidUpdate() {
        // if current userId URL param != to state.userIdParam,
        // <Post> Link [author | receiver] clicked => re - init() <Profile> + update state.userIdParam.
        if (this.state.userIdURLParam !== this.props.match.params.userId) {
            // re - init() <Profile>
            this.init();
            // scroll to top of page
            window.scrollTo({ top: 0, behavior: "smooth" });
            // window.location.reload();
            this.setState({ userIdURLParam: this.props.match.params.userId });
        }
    }
    /**
     * init() - get user profile form db then call loadPosts() to retreive user
     * associated posts from db.
     */
    init = () => {
        // get userId from URL <userID> param
        const userId = this.props.match.params.userId;
        // console.log("this.props.match.params.userId: ", this.props.match.params.userId);

        // fetch/request the user profile associated with userId from API
        const token = isAuthenticated().token;
        readUser(userId, token).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                this.setState({ user: data });
                this.loadPosts(data._id, token);
            }
            // console.log("user data: ", data);
        });
    };
    /**
     * loadPosts() - read posts from logged in user from db for mapping to child <Post> components.
     */
    loadPosts = (userId, token) => {
        // console.log(
        //     `Profile.loadPosts(userId, token): {\n\tuserId: ${userId}, \n\ttoken: ${token}\n}`
        // );
        this.setState({ posts: [] });
        listByUser(userId, token).then((data) => {
            if (data.error) console.log(data.error);
            else {
                this.setState({ posts: [] });
                this.setState({ posts: data });
            }
        });
    };

    render() {
        const { user, posts, userIdURLParam } = this.state;

        return (
            <div className="">
                {/* {console.log(this.state.user)} */}
                <AuthedNav />
                <div className="row col-lg-8 pt-4 mx-0 px-0 m-lg-auto">
                    <div className="rounded-lg col-sm-5 col-md-4 pr-sm-0 mr-lg-4 pr-lg-4 ">
                        <UserCard userIdURLParam={userIdURLParam} user={user} />
                    </div>
                    <div className="col ">
                        <CreatePost userIdURLParam={userIdURLParam} />
                        {posts.map((post) => {
                            if (post.author) {
                                return <Post key={post._id} post={post} />;
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
