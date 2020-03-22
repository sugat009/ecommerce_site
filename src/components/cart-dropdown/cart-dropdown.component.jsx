import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {withRouter} from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

// When mapDispatchToProps is not passed as argument to connect
// it passes dispatch function as a prop to the component
const CartDropdown = ({cartItems, history, dispatch}) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                        cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem}/>
                        )) :
                        <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton
                onClick={() => {
                    history.push("/checkout");
                    dispatch(toggleCartHidden());
                }}>
                GO TO CHECKOUT
            </CustomButton>
        </div>
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
