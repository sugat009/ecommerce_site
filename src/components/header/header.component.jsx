import React from "react";
import {connect} from "react-redux";

import "./header.styles.scss";
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from '../../firebase/firebase.utils';

const Header = ({currentUser}) => {
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
                        <div className="option" onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div> :
                        <Link to="/signin" className="option">
                            SIGN IN
                        </Link>
                }
            </div>
        </div>
    );
};

// here state is the top level root reducer
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

// connect() is a HOC that modifies our component to have access to the redux objects
export default connect(mapStateToProps)(Header);
