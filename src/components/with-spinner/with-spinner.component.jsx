import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

export const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => (
  isLoading ? (
    <SpinnerContainer>
      <SpinnerOverlay />
    </SpinnerContainer>
  ) : (
    <WrappedComponent {...otherProps} />
  )
);
