import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isConnected: null,
  roomsInfo:null
};

const stompReducer = createSlice({
  // 命名空间
  name: "stompReducer",
  // 初始化
  initialState,
  // reducers
  reducers: {
    init(state) {
      state.isConnected = true;
    },
    disConnect(state) {
      state.isConnected = false;
    },
    setRoomsInfo(state, action) { 
      state.roomsInfo = action.payload;
    },
    clearRoomsInfo(state) { 
      state.roomsInfo = initialState.roomsInfo;
    }
  },
});

export default stompReducer.reducer;
export const { init,disConnect,setRoomsInfo,clearRoomsInfo } = stompReducer.actions;
