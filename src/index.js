import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { fetchUsers } from "./features/users/usersSlice";
import "./api/server";

// we need only to fetch the list of users once, when the app starts
store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
