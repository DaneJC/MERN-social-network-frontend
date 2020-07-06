import React from "react";
import { Redirect } from "react-router-dom";

export const isAuthUser = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    // next();
    return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            console.log("Logout success.");
            // return res.json();
            return <Redirect to="/login" />;
        })
        .catch((err) => console.log(err));
};