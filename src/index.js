import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./api/server";
import { apiSlice } from "./api/apiSlice";
import { worker } from "./api/server";

async function main() {
  await worker.start({ onUnhandledRequest: "bypass" });
  store.dispatch(apiSlice.endpoints.getUsers.initiate());

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

main();
