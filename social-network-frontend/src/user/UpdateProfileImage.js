import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { update, updateUser } from "../user/UserAPI";

export default class UpdateProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: "",
            fileSize: "",
        };
    }
    componentDidMount() {
        this.userData = new FormData();
        // this.userId = this.props.match.params.userId;
    }
    handleChange = (photo) => (event) => {
        this.setState({
            photo: event.target.files[0],
            fileSize: event.target.files[0].size,
        });
        this.userData.set("photo", event.target.files[0]);
        console.log(this.userData.get("photo"));
    };
    clickSave = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });

        const userId = this.props.userId;
        const token = isAuthenticated().token;

        update(userId, token, this.userData).then((data) => {
            if (data.error) {
                this.setState({ error: data.error });
                // } else if (isAuthenticated().user.role === "admin") {
                //     this.setState({
                //         redirectToProfile: true,
                //     });
            } else {
                updateUser(data, () => {
                    // this.props.refresh();
                });
            }
        });
        // }
    };
    render() {
        // const { userID, props } = this.props;

        return (
            <div className="m-0 p-0 d-flex justify-content-center">
                <Link
                    to="#"
                    data-toggle="modal"
                    data-target="#updateProfielImgModal"
                    className="card-link secondary"
                >
                    <i className="fa fa-camera" aria-hidden="true"></i>
                </Link>

                <div
                    className="modal fade "
                    id="updateProfielImgModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
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
                                    id="exampleModalCenterTitle"
                                >
                                    Update Profile Image
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
                                <form>
                                    <div className="form-group">
                                        <label className="text-muted">
                                            Profile Photo
                                        </label>
                                        <input
                                            onChange={this.handleChange(
                                                "photo"
                                            )}
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={this.clickSave}
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
