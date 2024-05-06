import { combineReducers } from "redux";
import auth from "./auth";
import headerReducer from "./headerReducer"; // Update import here

const rootReducer = combineReducers({
  auth: auth,
  header: headerReducer, // Change the key to 'header'
});

export default rootReducer;