import { combineReducers } from "redux";
import AuthReducer from './AuthReducer';
import UserInputReducer from './UserInputFormReducer';
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: AuthReducer,
  userForm: UserInputReducer,
  users: UserReducer
});
