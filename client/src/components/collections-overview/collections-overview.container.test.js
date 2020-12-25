import { mapStateToProps } from './collections-overview.container';

describe('Components: Collections Overview Container', () => {
  const initialState = {
    shop: {
      isFetching: true,
    },
  };

  it('should map state', () => {
    expect(mapStateToProps(initialState)).toContainEntry(['isLoading', initialState.shop.isFetching]);
  });
});
