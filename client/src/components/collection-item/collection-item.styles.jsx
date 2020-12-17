import styled from 'styled-components';

const getBackgroundImage = ({ imageUrl }) => `background-image: url(${imageUrl});`;

export const CollectionItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  margin: 10px 0px;

  &:hover {
    .image {
      opacity: 0.8;
    }

    button {
      display: flex;
      opacity: 0.85;
    }
  }
  
  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }
  
  @media screen and (max-width: 800px) {
    width: 40vw;
    
    &:hover {
      .image {
        opacity: unset;
      }

      button {
        opacity: unset;
      }
    }
    
    button {
      display: block;
      opacity: 0.9;
      min-width: unset;
      padding: 0 10px;
    }
  }
`;

CollectionItemContainer.displayName = 'CollectionItemContainer';

export const CollectionItemImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  ${getBackgroundImage};
`;

CollectionItemImageContainer.displayName = 'CollectionItemImageContainer';

export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

CollectionFooterContainer.displayName = 'CollectionFooterContainer';

export const CollectionItemNameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

CollectionItemNameContainer.displayName = 'CollectionItemNameContainer';

export const CollectionItemPriceContainer = styled.span`
  width: 10%;
  text-align: right;
`;

CollectionItemPriceContainer.displayName = 'CollectionItemPriceContainer';
