import styled from 'styled-components';

export const SigningPageContainer = styled.div`
  width: 850px;
  margin: 30px auto;
`;

SigningPageContainer.displayName = 'SigningPageContainer';

export const ErrorContainer = styled.div`
  border-radius: 0.25rem;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
  color: white;
  background-color: #dc3545;
`;

ErrorContainer.displayName = 'ErrorContainer';

export const SigningPageFormsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
`;

SigningPageFormsContainer.displayName = 'SigningPageFormsContainer';
