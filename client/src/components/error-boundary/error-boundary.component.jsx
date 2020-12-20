import React from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // console.log(error);
    return { hasErrored: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    const { hasErrored } = this.state;
    const { children } = this.props;

    return (hasErrored)
      ? (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/3suxlvm.png" />
          <ErrorImageText>Something went wrong...</ErrorImageText>
        </ErrorImageOverlay>
      ) : (
        children
      );
  }
}

export default ErrorBoundary;
