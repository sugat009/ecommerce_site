import {createSelector} from 'reselect';

// Input selector is a function that takes in the whole state and
// returns a slice of it
const selectCart = state => state.cart;

// Calls the above selector and return value to selector below
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

// Calls the above selector and returns the value where it is called
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);
