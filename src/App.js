import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import "./App.css";

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    // Subscription for the user authentication
    unsubscribeFromAuth = null;

    componentDidMount() {
        // When the component is mounted it checks whether or not the user is signed in
        // or signed out
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            // this.setState({
            //     currentUser: user
            // })
            // Calling to create user in the database from the authentication data
            createUserProfileDocument(user);
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
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
