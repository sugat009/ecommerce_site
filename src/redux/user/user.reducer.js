// Module that handles changes to user
import UserActionTypes from "./user.types";

// Initial state, used in case of default
const INITIAL_STATE = {
    currentUser: null,
    error: null
};

// Reducers are just functions that get fired every time
// any action gets fired
// NOTE: an important thing to note is that all reducers in the
// app gets fired every time an action is committed
// so the switch cases should be specific and should only process
// concerned cases
// The default case is for when the reducer is called but its not its'
// job to handle that action

const userReducer = (state = INITIAL_STATE, action) => {
    // param state: object containing previous state
    // param action: object containing type of action and new data in payload
    // return state: returns new or old state
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
