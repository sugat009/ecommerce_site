import React from "react";

import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        };
    }

    // Catches error in children components
    static getDerivedStateFromError(error) {
        // Process the error
        console.log(error);
        return {hasErrored: true};
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png"/>
                    <ErrorImageText>Sorry, this page is lost.</ErrorImageText>
                </ErrorImageOverlay>
            )
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
