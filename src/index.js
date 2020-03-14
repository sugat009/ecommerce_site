import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./redux/store";

import "./index.css";
import App from "./App";


ReactDOM.render(
    // Provider is the main component object from react-redux that takes in the redux store
    // and is able to provide the store to all components in the app
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
