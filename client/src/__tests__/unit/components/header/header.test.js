import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapStateToProps, mapDispatchToProps } from '../../../../components/header/header.component';
import { signOutStart } from '../../../../redux/user/user.actions';
import getMockedState from "../../../utils/mock-state-provider";

describe('Components: Header', () => {
  const initialState = getMockedState(['cart', 'user']);

  describe('Header', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Header
          hidden={initialState.cart.hidden}
          currentUser={initialState.user.currentUser}
        />,
      );
    });

    it('should have logo as a link to homepage', () => {
      expect(wrapper.find('LogoContainer').prop('to')).toEqual('/');
    });

    it('should have link to "Shop"', () => {
      expect(wrapper.find('OptionLink[to="/shop"]').text()).toEqual('SHOP');
    });

    it('should have link to "Contact"', () => {
      expect(wrapper.find('OptionLink[to="/contact"]').text()).toEqual('CONTACT');
    });

    it('should have link to "Sign In" if user is not logged in', () => {
      expect(wrapper.find('OptionLink[to="/signing"]').text()).toEqual('SIGN IN');
    });

    it('should have link to "Sign Out" if user is logged in', () => {
      const currentUser = { id: 'kjfjksfal123', displayName: 'User Name' };
      wrapper.setProps({ currentUser });

      expect(wrapper.find('OptionLink').at(2).text()).toEqual('SIGN OUT');
    });

    it('should be able to log out user', () => {
      const currentUser = { id: 'kjfjksfal123', displayName: 'User Name' };
      const signOutStartMock = jest.fn();
      wrapper.setProps({ currentUser, signOutStart: signOutStartMock });
      wrapper.find('OptionLink').at(2).prop('onClick')();

      expect(signOutStartMock).toHaveBeenCalledTimes(1);
    });

    it('should hide cart dropdown', () => {
      wrapper.setProps({ hidden: true });

      expect(wrapper.find('withRouter(Connect(CartDropdown))')).toHaveLength(0);
    });

    it('should show cart dropdown', () => {
      wrapper.setProps({ hidden: false });

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('withRouter(Connect(CartDropdown))')).toHaveLength(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState))
        .toContainEntries([['currentUser', initialState.user.currentUser], ['hidden', initialState.cart.hidden]]);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ signOutStart }));
    });
  });
});
