import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./core/navs/AuthedNav";
import { isAuthenticated } from "./auth/index";
import UserCard from "./user/UserCard";
import CreatePost from "./post/CreatePost";
import { readUser } from "./user/UserAPI";
import { readAllPosts } from "./post/PostAPI";
import Post from "./post/Post";
import socket from "./socketIO/socket";

export default class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            posts: [],
        };
        // this.readLoggedInUser();
    }
    // componentDidMount() - Called immediately after a component is mounted.
    // Setting state here will trigger re-rendering.
    componentDidMount() {
        this.readLoggedInUser();
        socket.on("newPost", (newPost) => {
            let _posts = this.state.posts;
            _posts.unshift(newPost);
            this.setState({ posts: _posts });
            console.log(this.state.posts);
        });
    }
    /**
     * readLoggedInUser() - required to render user info in <UserCard> child component.
     */
    readLoggedInUser = () => {
        // get userId from URL <userID> param
        const userId = isAuthenticated().user._id;
        // fetch/request the user profile associated with userId from API
        const token = isAuthenticated().token;
        readUser(userId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ user: data });
                this.loadPosts();
            }
            // console.log("user data: ", data);
        });
    };
    /**
     * loadPosts() - read posts from all users in the db for mapping to child <Post> components.
     */
    loadPosts = () => {
        readAllPosts().then((data) => {
            if (data.error) console.log(data.error);
            else {
                this.setState({ posts: [] });
                this.setState({ posts: data });
            }
        });
    };

    render() {
        const { user, posts } = this.state;
        return (
            <div>
                <AuthedNav />
                <div className="row col-lg-9 col-xl- pt-4 mx-0 px-0 m-lg-auto ">
                    <div className="rounded-lg col-sm-5 col-xl-4 pr-sm-0 mr-lg-4 pr-lg-4">
                        <UserCard user={user} />
                    </div>
                    <div className="col">
                        <CreatePost userIdURLParam={null} />
                        {posts.map((post, i) => {
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
