import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "../core/navs/AuthedNav";
// import { getUserDetail } from "../helpers/index";
import { isAuthUser } from "../auth/index";
import { listByUser } from "../post/PostAPI";
import { readUser } from "../user/UserAPI";
import CreatePost from "../post/CreatePost";
import Post from "../post/Post";
import UserCard from "../user/UserCard";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            posts: [],
        };
    }
    // componentDidMount() - Called immediately after a component is mounted.
    // Setting state here will trigger re-rendering.
    componentDidMount() {
        this.init();
    }
    /**
     * init() - required to trigger re-rendering of <Profile> posts from child component 
     * <CreatePost> when new post is submitted via the parent <Profile> component.
     */
    init = () => {
        // get userId from URL <userID> param
        const userId = this.props.match.params.userId;
        // console.log("this.props.match.params.userId: ", this.props.match.params.userId);

        // fetch/request the user profile associated with userId from API
        const token = isAuthUser().token;
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
        listByUser(userId, token).then((data) => {
            data.error
                ? console.log(data.error)
                : this.setState({ posts: data });
            // console.log("posts data: ", data);
        });
        // console.log("this.state.posts: ", this.state.posts);
    };

    render() {
        const { user, posts } = this.state;
        return (
            <div>
                {/* {console.log(this.state.user)} */}
                <AuthedNav />
                <div className="row col-lg-10 pt-4 mx-0 px-0 m-lg-auto ">
                    <div className="rounded-lg col-sm-5 col-md-4 pr-sm-0 mr-lg-4 pr-lg-4">
                        <UserCard user={user} />
                    </div>
                    <div className="col ">
                        <CreatePost
                            profileUserId={this.props.match.params.userId}
                            reloadPosts={this.init.bind(this)}
                        />
                        {posts.map((post, i) => {
                            return <Post key={i} post={post} user={user} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
