import React, { Suspense } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import CollectionPreview from '../../components/preview/collection-preview.component';
import selectQueriedProducts from '../../redux/search/search.selectors';
import Spinner from '../../components/spinner/spinner.component';

const SearchResultsPage = ({ products }) => (
  <Suspense fallback={<Spinner />}>
    {
      products
        ? (
          <CollectionPreview
            title="Search"
            items={products}
            previewItemsNumber={products.length}
          />
        ) : null
    }
  </Suspense>
);

const mapStateToProps = createStructuredSelector({
  products: selectQueriedProducts,
});

export default connect(mapStateToProps)(SearchResultsPage);
