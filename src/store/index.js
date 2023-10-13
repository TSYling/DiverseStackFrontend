import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import musicReducer from "./reducers/musicReducer";
import stompReducer from "./reducers/stompReducer";
// const reducers = combineReducers({
//   userReducer,
//   musicReducer,
// });
// const store = legacy_createStore(reducers);

const newStore = configureStore({
  reducer: {
    userReducer,
    musicReducer,
    stompReducer
  }
})


export default newStore;


