import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routers from "./config/Routers";
import store from "./redux/store";
import { Provider } from "react-redux";
export const baseUrl = "http://3.110.131.173:4000/api/v1/";
// "http://13.235.9.208:4000/api/v1/"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Routers />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
