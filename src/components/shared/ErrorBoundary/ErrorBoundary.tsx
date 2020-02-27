import React, { ErrorInfo }  from "react";
import logger from "../../../Utils/logger";
import PropTypes from 'prop-types';

interface IErrorState {
    hasError: boolean;
    error: Error,
    errorInfo: ErrorInfo;
}

interface IErrorProps {
}

class ErrorBoundary extends React.Component<IErrorProps, IErrorState> {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        // render: PropTypes.func.isRequired
    };

    state: IErrorState = {
        hasError: false,
        error: new Error(),
        errorInfo: {componentStack: ''}
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error('[errorBoundary] componentDidCatch ', error, errorInfo);
        this.setState({
            hasError: true,
            error,
            errorInfo});
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Oops, something went wrong :(</h1>
                    <p> Error: {this.state.error.toString()}</p>
                    <p> Occured at: {this.state.errorInfo.componentStack}</p>
                </div>)
        }
        return this.props.children;
    }
}

export default ErrorBoundary;