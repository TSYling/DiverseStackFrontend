import  {lazy,Suspense} from "react"
import { createBrowserRouter } from "react-router-dom"
import LoginComponent from "../Component/LoginComponent";
// const LoginComponent = lazy(() => { import("../Component/LoginComponent") });
import LoginInfoComponent from "../Component/LoginInfoComponent";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginComponent title="登录||注册" />
  },
  {
    path: "/loginInfo",
    element: <LoginInfoComponent title="用户信息"/>
  },
]);
