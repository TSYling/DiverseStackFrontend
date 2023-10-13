//-------------------------------------OLD--------------------------
// const musciReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "SEARCH":
//       return {...state, data: action.payload};
//     default:
//       return state;
//   }
// }

// export default musciReducer;
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchData: {},
};

const musicReducer = createSlice({
  // 命名空间
  name: "musicReducer",
  // 初始化
  initialState,
  // reducers
  reducers: {
    search(state, action) { 
      state.searchData = action.payload;
    }
  },
});

export default musicReducer.reducer;
export const { search } = musicReducer.actions;