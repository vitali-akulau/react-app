import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;

  img {
    width: 30%;
  }
`;

CartItemContainer.displayName = 'CartItemContainer';

export const ItemDetailsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
`;

ItemDetailsContainer.displayName = 'ItemDetailsContainer';

export const CartItemTextContainer = styled.span`
  font-size: 16px;
`;

CartItemTextContainer.displayName = 'CartItemTextContainer';
