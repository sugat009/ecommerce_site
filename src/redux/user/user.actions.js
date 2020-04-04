import UserActionTypes from "./user.types";

// Action is a function that gets fired when an action is performed in the UI
// It gets an argument needed of change which then, fires the appropriate reducer
// NOTE: the type of this action function is exactly same as that of user.reducer.js
// because this action needs to work only with the user.reducer.js
export const googleSignInStart = () => ({
   type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});
