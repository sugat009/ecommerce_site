import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from "./redux/user/user.actions";

import "./App.css";

class App extends Component {
    // Subscription for the user authentication
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        // When the component is mounted it checks whether or not the user is signed in
        // or signed out
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                // Calling to create user in the database from the authentication data
                const userRef = await createUserProfileDocument(userAuth);

                // Setting the currentUser state using the snapShot obtained from firebase
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                });
            } else {
                // In case of logout setting current user as null
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        // calling the onAuthStateChange method once the App component is unmounted to
        // prevent memory leaks
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

// mapDispatchToProps is a function that is used for dispatching actions to the store
// the argument {dispatch} in this function actually calls the root reducer with the object
// before reducing, we call our action function to get the proper object that is needed by
// the reducer in question, in this case the setCurrentUser
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

// Since we dont need state as props in this component we are setting the first argument as null
export default connect(null, mapDispatchToProps)(App);
