import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";

import {ReactComponent as Logo} from "../../assets/crown.svg";
import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles";

const Header = ({currentUser, hidden}) => {
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
                        onClick={() => auth.signOut()}
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

// connect() is a HOC that modifies our component to have access to the redux objects
export default connect(mapStateToProps)(Header);
