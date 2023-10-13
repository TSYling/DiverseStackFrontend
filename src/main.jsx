import React from "react";
import ReactDOM from "react-dom/client";
import NavigationComponent from "./Component/NavigationComponent";
import "./index.css";

import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense
        fallback={
          <div className="loading">
          <Spin size="large" />
        </div>}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<NavigationComponent />} />
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
