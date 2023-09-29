import { createSlice } from "@reduxjs/toolkit";
/**
 * OLD__________________________________
 */
// const userInfo = {
//   detail: {},
//   info:{},
//   isLogin: false
// };

// const userReducer = (state = userInfo, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       // 保存登录detail
//       return { info: {},detail:action.payload, isLogin: true };
//     case "LOGOUT":
//       // 回归初始
//       return userInfo;
//     case "UPDATE":
//       // 更新记录用户信息
//       return { ...state,info:action.payload, isLogin: true };
//     default:
//       return state;
//   }
// };

// export default userReducer;

const initialState = {
  detail: {},
  info: {},
  isLogin: false,
  stomp: {
    client: null,
    isOnline: false,
  },
};

const userReducer = createSlice({
  // 命名空间
  name: "userReducer",
  // 初始化
  initialState,
  // reducers
  reducers: {
    login(state, action) {
      state.detail = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = initialState.isLogin
    },
    update(state, action) {
      state.info = action.payload;
      state.isLogin = true;
    }
  },
});

export default userReducer.reducer;
export const { login, logout, update } = userReducer.actions;
