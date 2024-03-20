import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import app from "./App.module.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <p className={app["text-green"]}>Hello green !</p>
    <p className="text-red">Hello red !</p>
  </React.StrictMode>
);