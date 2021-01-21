import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

SignInContainer.displayName = 'SignInContainer';

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

SignInTitle.displayName = 'SignInTitle';

export const SignInButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ErrorContainer = styled.div`
  border-radius: 0.25rem;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
  color: white;
  background-color: #dc3545;
`;

SignInButtonsContainer.displayName = 'SignInButtonsContainer';
