import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";

// This function is from redux library that combines all the reducers into one big reducer
// The key are the value in the redux store whereas the value are the respective reducers
// called when necessary

export default combineReducers({
   user: userReducer
});
