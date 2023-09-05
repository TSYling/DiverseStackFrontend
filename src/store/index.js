import { combineReducers, legacy_createStore } from "redux";
import userReducer from "./reducers/userReducer";
import musicReducer from "./reducers/musicReducer";
const reducers = combineReducers({
  userReducer,
  musicReducer,
});
  const store = legacy_createStore(reducers);

export default store;


