import service from "../../util/axoisUtil";

import { login,update,logout } from "../../store/reducers/userReducer";

const loginService = (payload) => {
  return async (dispatch) => {
    const response = await service.post("/user/login", payload);
    // 登录成功
    const info = response.data;
    console.log(info);
    // 登录成功后设置登录状态
    dispatch(login(info.authentication.details));
    // 获取用户信息
    dispatch(getInfo());
    /**
     * 当用户退出后 全局状态管理内的数据将被清空
     * 当用户下一次进入页面的时候 或者刷新页面
     * 需要重新获取用户信息 为了确定一个是否拿info
     * 的状态 这里采取jwt手段在localstoreage中保存一个字段 hadLogined
     * 作为判断是否用户此前登录过
     */
    localStorage.setItem("hadLogined", "yes");
  };
}
async function register(data) { 
  return service
    .post("/user/register", data);
}
const getInfo = () => {
  
  return async (dispatch, getState)=>{
    // 获取用户信息
    // 为了防止重复获取信息
    var info = getState().userReducer.info;
    if (Object.keys(info).length != 0) return;
    service
      .post("/user/info")
      .then((response) => {
        // 获取用户信息成功 已登录状态
        info = response.data;
        // 登录成功后设置登录状态
        dispatch(update(info.data));
      })
      .catch((error) => {
        // 获取用户信息失败 未登录状态
        dispatch(logout);
        localStorage.setItem("hadLogined", "no");
        // 若 返回的错误 msg 为 会话已失效
        throw error
      });
  }
  
}


export default { loginService, register, getInfo };
