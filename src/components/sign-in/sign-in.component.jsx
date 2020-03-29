import React, {Component} from "react";

import {auth, signInWithGoogle} from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {ButtonsBarContainer, SignInContainer, SignInTitle} from "./sign-in.styles";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: "",
                password: ""
            });
        } catch (e) {
            console.error("Error while signing in with email and password");
            console.error(e);
        }
    };

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password</span>

                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <ButtonsBarContainer>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign In With Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        );
    }
}

export default SignIn;
