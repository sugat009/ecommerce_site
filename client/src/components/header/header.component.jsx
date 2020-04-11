import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";

import {ReactComponent as Logo} from "../../assets/crown.svg";
import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";

const Header = ({currentUser, hidden, startSignOut}) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/shop">
                    CONTACT
                </OptionLink>
                {currentUser ? (
                    <OptionLink
                        as="div"
                        onClick={startSignOut}
                    >
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink to="/signin">
                        SIGN IN
                    </OptionLink>
                )}
                <CartIcon/>
            </OptionsContainer>
            {hidden ? null : <CartDropdown/>}
        </HeaderContainer>
    );
};

// here state is the top level root reducer
// createStructuredSelector is a function that passes in the top level state
// to the appropriate selector and the selectors return the necessary value to
// the properties
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    startSignOut: () => dispatch(signOutStart())
});

// connect() is a HOC that modifies our component to have access to the redux objects
export default connect(mapStateToProps, mapDispatchToProps)(Header);
