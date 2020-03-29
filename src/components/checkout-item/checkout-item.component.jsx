import React from "react";
import {connect} from "react-redux";

import {addItem, clearItemFromCart, removeItem} from "../../redux/cart/cart.actions";

import {
    CheckoutItemContainer,
    ImageContainer,
    QuantityContainer,
    RemoveButtonContainer,
    TextContainer
} from "./checkout-item.styles";

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img alt="item" src={imageUrl}/>
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItem(cartItem)}>
                    &#10094;
                </div>
                <span>{quantity}</span>
                <div onClick={() => addItem(cartItem)}>
                    &#10095;
                </div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
                &#10005;
            </RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
