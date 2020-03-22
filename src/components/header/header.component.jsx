import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";

import "./header.styles.scss";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from '../../firebase/firebase.utils';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";

const Header = ({currentUser, hidden}) => {
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/shop">
                    CONTACT
                </Link>
                {
                    currentUser ?
                        (<div className="option" onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div>) :
                        (<Link to="/signin" className="option">
                            SIGN IN
                        </Link>)
                }
                <CartIcon/>
            </div>
            {
                hidden ?
                    null :
                    <CartDropdown/>
            }
        </div>
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
