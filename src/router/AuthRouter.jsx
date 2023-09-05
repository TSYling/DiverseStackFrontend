import { useMatches, useOutlet, useAppSelector, useMemo } from "react";
import {useNavigate}from "react-router-dom"
import {useEffect} from "react"
function AuthRouter() {
  /**
   * 1.获取路由匹配信息
   * 2.获取子路由元素
   * 3.获取 store 中的登录信息
   */
  const matches = useMatches(); //这个钩子只有 data Router 下能用
  const outlet = useOutlet();
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  const navigate = useNavigate()

  const page = useMemo(() => {

    if (isLogined) return outlet;
    // return <Navigate to="login" replace />;
    navigate("/login",{replace:true})
  }, [isLogined, outlet, navigate]);
  /**
   * 模仿 vue-router 后置钩子修改网页标题
   */
  useEffect(() => {
    const title = (matches[1])?.title;
    const isHasTitle = typeof title === "string";
    if (isHasTitle) {
      document.title = title;
    }
  }, [matches]);
  return page;
}

export default AuthRouter;