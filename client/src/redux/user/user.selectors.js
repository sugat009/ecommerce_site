import {createSelector} from "reselect";

// Input selector that gives out user from the state
const selectUser = state => state.user;

// Gets user from state using selector above and return currentuser
// from where it is called
export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);
