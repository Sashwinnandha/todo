// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://todo-backend-abxd.onrender.com"); // your backend URL

export default socket;
