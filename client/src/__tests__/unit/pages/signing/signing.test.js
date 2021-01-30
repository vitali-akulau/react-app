import React from 'react';
import { shallow } from 'enzyme';
import { SigningPage, mapStateToProps } from '../../../../pages/signing/signing.component';
import getMockedState from '../../../utils/mock-state-provider';

describe('Pages: Signing Page', () => {
  const error = { message: 'something bad happened' };

  describe('Signing Page', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SigningPage />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render without errors', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render error block', () => {
      wrapper.setProps({ error });

      expect(wrapper.find('ErrorContainer').text()).toEqual(error.message);
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      const initialState = getMockedState(['user']);
      initialState.user.error = error;

      expect(mapStateToProps(initialState)).toContainEntry(['error', initialState.user.error]);
    });
  });
});
