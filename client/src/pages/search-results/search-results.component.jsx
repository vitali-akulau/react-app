import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import CollectionPreview from '../../components/preview/collection-preview.component';
import { selectQueriedProducts, selectIsFetching } from '../../redux/search/search.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const SearchResultsPage = ({ isLoading, products }) => (
  products
    ? (
      <CollectionPreview
        title="Search"
        items={products}
        previewItemsNumber={products.length}
      />
    ) : null
);

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
  products: selectQueriedProducts,
});

export default connect(mapStateToProps)(WithSpinner(SearchResultsPage));
