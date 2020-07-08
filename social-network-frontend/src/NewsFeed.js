import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AuthedNav from "./core/navs/AuthedNav";
import { isAuthUser } from "./auth/index";
import UserCard from "./user/UserCard";
import CreatePost from "./post/CreatePost";
import { getUserDetail } from "./helpers/index";
import { readUser } from "./user/UserAPI";
import { readAllPosts } from "./post/PostAPI";
import Post from "./post/Post";

export default class NewsFeed extends Component {
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
        this.readLoggedInUser()
    }
    /**
     * readLoggedInUser() - required to render user info in <UserCard> child component.
     */
    readLoggedInUser = () => {
        // get userId from URL <userID> param
        const userId = getUserDetail("_id");
        // fetch/request the user profile associated with userId from API
        const token = isAuthUser().token;
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
            data.error
                ? console.log(data.error)
                : this.setState({ posts: data });
            console.log("posts data: ", data);
        });
        console.log("this.state.posts: ", this.state.posts);
    };

    render() {
        const { user, posts } = this.state;
        return (
            <div>
                <AuthedNav />
                <div className="row col-lg-10 pt-4 mx-0 px-0 m-lg-auto ">
                    <div className="rounded-lg col-sm-5 col-md-4 pr-sm-0 mr-lg-4 pr-lg-4">
                        <UserCard user={user} />
                    </div>
                    <div className="col">
                        <CreatePost
                            // profileUserId={this.props.match.params.userId}
                            reloadPosts={this.loadPosts.bind(this)}
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
