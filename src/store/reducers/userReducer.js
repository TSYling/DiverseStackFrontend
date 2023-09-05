
const userInfo = {
  detail: {},
  info:{},
  isLogin: false
};

const userReducer = (state = userInfo, action) => {
  switch (action.type) {
    case "LOGIN":
      // 保存登录detail
      return { info: {},detail:action.payload, isLogin: true };
    case "LOGOUT":
      // 回归初始
      return userInfo;
    case "UPDATE":
      // 更新记录用户信息
      return { ...state,info:action.payload, isLogin: true };
    default:
      return state;
  }
};

export default userReducer;

