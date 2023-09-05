import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { zhCN } from "antd/locale/zh_CN";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux"
import store from "./store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          fontSize: 15,
          wireframe: true,
          colorPrimary: "#17cbe3",
          colorSuccess: "#64f51b",
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
