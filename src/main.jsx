import React from "react";
import ReactDOM from "react-dom/client";
import NavigationComponent from "./Component/NavigationComponent";
import "./index.css";

import { Provider } from "react-redux"
import store from "./store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NavigationComponent />
    </Provider>
  </React.StrictMode>
);
