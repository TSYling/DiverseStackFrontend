import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import musicReducer from "./reducers/musicReducer";
// const reducers = combineReducers({
//   userReducer,
//   musicReducer,
// });
// const store = legacy_createStore(reducers);

const newStore = configureStore({
  reducer: {
    userReducer,
    musicReducer,
  }
})


export default newStore;


