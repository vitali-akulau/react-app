import styled, { css } from 'styled-components';

const checkoutItemPropStyles = css`
  width: 23%;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

CheckoutItemContainer.displayName = 'CheckoutItemContainer';

export const CheckoutItemImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
 }
`;

CheckoutItemImageContainer.displayName = 'CheckoutItemImageContainer';

export const NameContainer = styled.span`
  ${checkoutItemPropStyles}
`;

NameContainer.displayName = 'NameContainer';

export const QuantityContainer = styled.span`
  ${checkoutItemPropStyles};
  display: flex;
`;

QuantityContainer.displayName = 'QuantityContainer';

export const PriceContainer = styled.span`
  ${checkoutItemPropStyles};
`;

PriceContainer.displayName = 'PriceContainer';

export const ArrowContainer = styled.div`
  cursor: pointer;
`;

ArrowContainer.displayName = 'ArrowContainer';

export const ValueContainer = styled.span`
  margin: 0 10px;
`;

ValueContainer.displayName = 'ValueContainer';

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

RemoveButton.displayName = 'RemoveButton';
