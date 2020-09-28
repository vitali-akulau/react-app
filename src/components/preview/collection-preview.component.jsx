import React from 'react';
import './collection-preview.styles.scss';
import _ from 'lodash';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items, previewItemsNumber }) => (
  <div className="collection-preview">
    <h1 className="title">{_.toUpper(title)}</h1>
    <div className="preview">
      {
        _.take(items, previewItemsNumber).map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))
      }
    </div>
  </div>
);

export default CollectionPreview;
