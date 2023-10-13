import { useEffect } from 'react'
// import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import service from '../../../util/axoisUtil'
import {logout} from "../../../store/reducers/userReducer"
function LogoutComponent(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = props.title
    service.post("/user/logout")
      .then(() => {
        // 退出登录后会缺少csrftoken因此需要重新获取
        service.get("/csrf")
        // 同时设置登录状态
        dispatch(logout())
        // 改变localstorage
        localStorage.setItem("hadLogined","no")
      })
  })

  // return <Navigate to="/" replace />
  // 可以清除所有相关数据 状态state
  return <>{(window.location.href = "/")}</>;
}

export default LogoutComponent