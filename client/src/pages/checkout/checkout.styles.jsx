import styled from 'styled-components';

export const CheckoutPageContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  
  button {
    margin-left: auto;
    margin-top: 50px;
  }
`;

CheckoutPageContainer.displayName = 'CheckoutPageContainer';

export const CheckoutHeaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

CheckoutHeaderContainer.displayName = 'CheckoutHeaderContainer';

export const CheckoutHeaderBlockContainer = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

CheckoutHeaderBlockContainer.displayName = 'CheckoutHeaderBlockContainer';

export const CheckoutTotal = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

CheckoutTotal.displayName = 'CheckoutTotal';

export const TestWarningContainer = styled.div`
  text-align: center;
  color: red;
  margin-top: 40px;
  font-size: 24px;
`;

TestWarningContainer.displayName = 'TestWarningContainer';
