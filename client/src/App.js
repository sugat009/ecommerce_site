import React, {lazy, Suspense, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import Header from "./components/header/header.component";
import {checkUserSession} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import Spinner from "./components/spinner/spinner.component";

import {GlobalStyle} from "./global.styles";

// This makes the component to be loaded on when the client visits that component or page
const Homepage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

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
            <GlobalStyle/>
            <Header/>
            <Switch>
                {/* Because the fetching of the component is synchronous if the component is yet */}
                {/* to be fetched the component will not exist yet */}
                {/* So it is basically for async loading */}
                {/* The fallback renders something until the component to be loaded is loaded */}
                <Suspense fallback={<Spinner/>}>
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
                </Suspense>
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
