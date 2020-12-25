import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { CollectionPageContainer, CollectionPageTitle, CollectionPageItemsContainer } from './collection.styles';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';

export const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionPageTitle>{_.capitalize(title)}</CollectionPageTitle>
      <CollectionPageItemsContainer>
        {
          items.map((item) => <CollectionItem key={item.id} item={item} />)
        }
      </CollectionPageItemsContainer>
    </CollectionPageContainer>
  );
};

export const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
