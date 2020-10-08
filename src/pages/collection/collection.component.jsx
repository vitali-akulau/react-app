import React from 'react';
import './collection.styles.scss';
import '../../components/collections-overview/collections-overview.component';

const CollectionPage = ({ match }) => {
  console.log(match);

  return (
    <div className="collection-page">
      <h2>COLLECTION PAGE</h2>
    </div>
  );
};

export default CollectionPage;
