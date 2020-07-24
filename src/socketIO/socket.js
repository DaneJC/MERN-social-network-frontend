import openSocket from "socket.io-client";

const socket = openSocket("http://192.168.1.10:5000");

export default socket;
