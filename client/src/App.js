import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";

import "./App.css";
import CheckoutPage from "./pages/checkout/checkout.component";
import {checkUserSession} from "./redux/user/user.actions";

const App = ({checkUserSession, currentUser}) => {
    useEffect(() => {
        // When the component is mounted it checks whether or not the user is signed in
        // or signed out
        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //     if (userAuth) {
        //         // Calling to create user in the database from the authentication data
        //         const userRef = await createUserProfileDocument(userAuth);
        //
        //         // Setting the currentUser state using the snapShot obtained from firebase
        //         userRef.onSnapshot(snapshot => {
        //             setCurrentUser({
        //                 id: snapshot.id,
        //                 ...snapshot.data()
        //             });
        //         });
        //     } else {
        //         // In case of logout setting current user as null
        //         setCurrentUser(userAuth);
        //     }
        // });
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <Header/>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Homepage}
                />
                <Route
                    path="/shop"
                    component={ShopPage}
                />
                <Route
                    exact
                    path="/checkout"
                    component={CheckoutPage}
                />
                <Route
                    exact
                    path="/signin"
                    render={() =>
                        currentUser ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignInAndSignUpPage/>
                        )
                    }
                />
            </Switch>
        </div>
    );
};

// mapDispatchToProps is a function that is used for dispatching actions to the store
// the argument {dispatch} in this function actually calls the root reducer with the object
// before reducing, we call our action function to get the proper object that is needed by
// the reducer in question, in this case the setCurrentUser
const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

// IF we dont need state as props in this component we set the first argument as null
export default connect(mapStateToProps, mapDispatchToProps)(App);
