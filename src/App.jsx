import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import cookie from "react-cookies";
import service from "./util/axoisUtil";
import userService from "./service/User";
import { useDispatch } from "react-redux"
import { Spin } from "antd";
const LoginComponent = lazy(() => import("./Component/User/LoginComponent"));
const LoginInfoComponent = lazy(() =>
  import("./Component/User/LoginInfoComponent")
);
const IndexComponent = lazy(() => import("./Component/IndexComponent"));
const NotFoundComponent = lazy(() => import("./Component/NotFoundComponent"));
const LogoutComponent = lazy(() => import("./Component/User/LogoutComponent"));
const MusicSearchComponent = lazy(() =>
  import("./Component/music/MusicSearchComponent")
);
const MusicDetailComponent = lazy(() =>
  import("./Component/music/MusicDetailComponent")
);

const RegisterComponent = lazy(() =>
  import("./Component/User/RegisterComponent")
);
const LiveComponent = lazy(() => import("./Component/Live/main"));
const ChatComponent = lazy(() => import("./Component/Chat/main"));


// -----------------------------------------------Test ----------------------------------------------------
const TestComponent = lazy(() => import("./Component/TestComponent.jsx"));

function App() {
  const dispatch = useDispatch()
  const csrf = cookie.load("XSRF-TOKEN");
  useEffect(() => {
    (async () => {
      // 后端请求到csrf
      if (csrf == null) await service.get("/csrf");
      // 初始化获取用户基本信息
      /**
       * 在此处确定用户此前是否登录过
       * 若登录过 请求获取数据
       * 否则 不做处理
       */
      if (
        localStorage.getItem("hadLogined") == "yes" ||
        cookie.load("remember-me") !== undefined
      )
        dispatch(userService.getInfo());
    })();
  });
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      {/* <Suspense
        fallback={
          <div className="loading">
            <Spin size="large" />
          </div>
        }
      >
        <BrowserRouter> */}
      {/* 注意：路由跳转不可贸然原生local进行跳转
          使用原生路由跳转会重新刷新界面使得状态传递失效      
      */}
          <Routes>
            <Route path="" element={<IndexComponent title="欢迎~" />} />
            <Route path="login" element={<LoginComponent title="登录" />} />
            <Route
              path="logout"
              element={<LogoutComponent title="注销中。。" />}
            />
            <Route
              path="loginInfo"
              element={<LoginInfoComponent title="用户信息" />}
            />
            <Route path="register" element={<RegisterComponent />} />
            <Route path="music" exact element={<MusicSearchComponent />} />
            <Route path="music/detail" element={<MusicDetailComponent />} />
            <Route path="live" element={<LiveComponent />} />
            <Route path="chat/*" element={<ChatComponent />} />
            
            <Route path="test" element={<TestComponent />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        {/* </BrowserRouter>
      </Suspense> */}
    </>
  );
}

export default App;
