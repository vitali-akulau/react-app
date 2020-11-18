import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import { searchProductsStart } from '../../redux/search/search.actions';
import CustomButton from '../custom-button/custom-button.component';

const SearchBar = ({ searchProductsStart }) => {
  const [searchQuery, setSearchQuery] = useState({ query: '' });
  const { query } = searchQuery;

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchQuery({ query: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    searchProductsStart(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        name="search"
        type="search"
        value={query}
        handleChange={handleChange}
      />
      <CustomButton type="submit">Search</CustomButton>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchProductsStart: (searchQuery) => dispatch(searchProductsStart(searchQuery)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
