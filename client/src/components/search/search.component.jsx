import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchInputContainer, FormInputContainer, SearchIconContainer } from './search.styles';
import { searchProductsStart } from '../../redux/search/search.actions';

export const SearchBar = ({ searchProductsStart, history }) => {
  const [searchQuery, setSearchQuery] = useState({ query: '' });
  const { query } = searchQuery;

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchQuery({ query: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchProductsStart(query);
      history.push(`/search?q=${event.target.value}`);
    }
  };

  return (
    <SearchInputContainer>
      <FormInputContainer
        name="search"
        type="search"
        value={query}
        handleChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIconContainer />
    </SearchInputContainer>
  );
};

export const mapDispatchToProps = (dispatch) => ({
  searchProductsStart: (searchQuery) => dispatch(searchProductsStart(searchQuery)),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
