export const getUserDetail = (detail) => {
    let authData = "";
    if (typeof window != "undefined") {
        authData = JSON.parse(localStorage.getItem("jwt"));
        // next();
        if (authData) {
            // console.log(authData.user);
            if (detail === "token") return authData.token;
            if (detail === "_id") return authData.user._id;
            if (detail === "forename") return authData.user.forename;
            if (detail === "surname") return authData.user.surname;
            if (detail === "email") return authData.user.email;
            // if (detail === "forename") return authData.user.forename;
        }
    }
};
