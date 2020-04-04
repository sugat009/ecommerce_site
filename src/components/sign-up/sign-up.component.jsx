import React, {Component} from "react";
import {connect} from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {SignUpContainer, SignUpTitle} from "./sign-up.styles";
import {signUpStart} from "../../redux/user/user.actions";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        const {startSignUp} = this.props;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        startSignUp({email, password, displayName});
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <SignUpContainer>
                <SignUpTitle>I do not have a account</SignUpTitle>
                <span>Sign up with your email</span>
                <form
                    className="sign-up-form"
                    onSubmit={this.handleSubmit}
                >
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </SignUpContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startSignUp: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
