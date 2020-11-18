import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import { searchProductsStart } from '../../redux/search/search.actions';

const SearchBar = ({ searchProductsStart }) => {
  const [searchQuery, setSearchQuery] = useState({ query: '' });
  const { query } = searchQuery;

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchQuery({ query: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchProductsStart(query);
      setSearchQuery({ query: '' });
    }
  };

  return (
    <FormInput
      name="search"
      type="text"
      value={query}
      handleChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchProductsStart: (searchQuery) => dispatch(searchProductsStart(searchQuery)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
