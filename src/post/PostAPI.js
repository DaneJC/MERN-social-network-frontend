export const create = (userId, token, post) => {
    return fetch(`${process.env.API_URI}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: post,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const readAllPosts = () => {
    return fetch(`${process.env.API_URI}/posts`, {
        method: "GET",
    })
        .then((response) => {
            // console.log(
            //     `PostAPI.readAllPosts(): {\n\tresponse.json(): ${response.json()}\n}`
            // );
            return response.json();
        })
        .catch((err) => console.log(err));
};

// // with pagination
// export const list = page => {
//     return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`, {
//         method: "GET"
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

export const singlePost = (postId) => {
    return fetch(`${process.env.API_URI}/post/${postId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const listByUser = (userId, token) => {
    // console.log(`PostAPI.listByUser(userId, token): {\n\tuserId: ${userId}, \n\ttoken: ${token}\n}`);
    return fetch(`${process.env.API_URI}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const remove = (postId, token) => {
    return fetch(`${process.env.API_URI}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const update = (postId, token, post) => {
    console.log(postId, token, post);
    return fetch(`${process.env.API_URI}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: post,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const like = (userId, token, postId) => {
    return fetch(`${process.env.API_URI}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.API_URI}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.API_URI}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId, comment }),
    })
        .then((response) => {
            // console.log(response.json());
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.API_URI}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId, comment }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
