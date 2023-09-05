import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
function IndexComponent(props) {
  const userEmail = props.email;
  useEffect(() => {
    document.title = props.title;
  });
  useEffect(() => {
    // 从后端拿功能分类
    // TODO
  });
  return userEmail == null ? (
    <>
      <div>欢迎来到主页</div>
      <NavLink to="/login">请登录</NavLink>
    </>
  ) : (
      <>
        <div>欢迎,{ userEmail }<NavLink to="/logout">注销</NavLink></div>
        <NavLink to="/music">音乐中心</NavLink>
      </>
  );
}
function mapStateToProps(state) {
  return {
    email: state.userReducer.info.email,
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}

const IndexComponent2 = connect(mapStateToProps,mapDispatchToProps)(IndexComponent);

export default IndexComponent2;
