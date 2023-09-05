import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import service from '../../../util/axoisUtil'
function LogoutComponent(props) {

  useEffect(() => {
    document.title = props.title
    service.post("/user/logout")
      .then(() => {
        // 退出登录后会缺少csrftoken因此需要重新获取
        service.get("/csrf")
        // 同时设置登录状态
        props.signOut();
        // 改变localstorage
        localStorage.setItem("hadLogined","no")
      })
  })

  return <Navigate to="/" replace />
}
function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch({type:"LOGOUT"}),
  };
}
const LoginComponent2 = connect(null,mapDispatchToProps)(LogoutComponent)

export default LoginComponent2