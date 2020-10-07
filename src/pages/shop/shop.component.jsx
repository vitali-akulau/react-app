import React from 'react';
import './shop.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../../components/preview/collection-preview.component';
import { selectCollections } from '../../redux/shop/shop.selectors';

const ShopPage = ({ collections }) => {
  const PREVIEW_ITEMS_NUMBER = 4;

  return (
    <div className="shop-page">
      <h1>Shop Page</h1>
      {
        collections.map(({ id, title, items }) => (
          <CollectionPreview
            key={id}
            title={title}
            items={items}
            previewItemsNumber={PREVIEW_ITEMS_NUMBER}
          />
        ))
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPage);
