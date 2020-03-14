import {UserActionTypes} from "./user.types";
// Action is a function that gets fired when an action is performed in the UI
// It gets an argument needed of change which then, fires the appropriate reducer
// NOTE: the type of this action function is exactly same as that of user.reducer.js
// because this action needs to work only with the user.reducer.js

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});
