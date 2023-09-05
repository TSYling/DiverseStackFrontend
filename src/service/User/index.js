import service from "../../util/axoisUtil";
import store from "../../store"
function login(data) {

  // 登录获取 信息
  service
    .post("/user/login", data)
    .then((response) => {
      // 登录成功
      const info = response.data;
      console.log(info);
      // 登录成功后设置登录状态
      store.dispatch({ type: "LOGIN", payload: info.authentication.details });
      // 获取用户信息
      getInfo()
      /**
       * 当用户退出后 全局状态管理内的数据将被清空
       * 当用户下一次进入页面的时候 或者刷新页面
       * 需要重新获取用户信息 为了确定一个是否拿info
       * 的状态 这里采取jwt手段在localstoreage中保存一个字段 hadLogined
       * 作为判断是否用户此前登录过 
       */
      localStorage.setItem("hadLogined", "yes");
    })
    .catch((error) => {
      // 登录失败
      console.log(error);
    });
}
function getInfo() {
  // 获取用户信息
  // 为了防止重复获取信息
  var info = store.getState().userReducer.info;
  if (Object.keys(info).length != 0)
    return;
  service
    .post("/user/info")
    .then((response) => {
      // 获取用户信息成功 已登录状态
      info = response.data;
      // 登录成功后设置登录状态
      store.dispatch({ type: "UPDATE",payload:info.data })
    }).catch((error) => {
      // 获取用户信息失败 未登录状态
      store.dispatch({ type: "LOGOUT" });
      localStorage.setItem("hadLogined", "no");
      // 若 返回的错误 msg 为 会话已失效
      // TODO
    })

}

export default { login,getInfo };
