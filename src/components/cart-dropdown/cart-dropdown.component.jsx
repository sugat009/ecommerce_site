import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {withRouter} from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import {
    CartDropdownButton,
    CartDropDownContainer,
    CartItemsContainer,
    EmptyMessageContainer
} from "./cart-dropdown.styles";

// When mapDispatchToProps is not passed as argument to connect
// it passes dispatch function as a prop to the component
const CartDropdown = ({cartItems, history, dispatch}) => {
    return (
        <CartDropDownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ?
                        cartItems.map(cartItem => (
                            <CartItem
                                key={cartItem.id}
                                item={cartItem}
                            />
                        )) :
                        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                }
            </CartItemsContainer>
            <CartDropdownButton
                onClick={() => {
                    history.push("/checkout");
                    dispatch(toggleCartHidden());
                }}
            >
                GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropDownContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

// HOC can be nested
// The evaluation is done from inside-out
// So the whatever output is that from connect() is fed as argument
// to withRouter() which gives access to our component to history API
export default withRouter(connect(mapStateToProps)(CartDropdown));
