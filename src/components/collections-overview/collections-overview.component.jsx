import React from 'react';
import './collections-overview.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../preview/collection-preview.component';
import { selectCollections } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({ collections }) => {
  const PREVIEW_ITEMS_NUMBER = 4;
  return (
    <div className="collection-overview">
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

export default connect(mapStateToProps)(CollectionsOverview);
