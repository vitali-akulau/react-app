import React from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    }
  }

  static getDerivedStateFromError(error) {
    // console.log(error);
    return { hasErrored: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    return (this.state.hasErrored)
      ? (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/3suxlvm.png" />
          <ErrorImageText>Something went wrong...</ErrorImageText>
        </ErrorImageOverlay>
      ) : (
        this.props.children
      )
  }
}

export default ErrorBoundary;
