import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';
import { ReactComponent as Logo } from '../../static/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import SearchBar from '../search/search.component';
import {
  HeaderContainer, LogoContainer, OptionsContainer, OptionLink,
} from './header.styles';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

export const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer data-test="header">
    <LogoContainer to="/" id="site-logo">
      <Logo />
    </LogoContainer>
    <OptionsContainer>
      <SearchBar />
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contact">CONTACT</OptionLink>
      {
        currentUser
          ? <OptionLink as="div" onClick={signOutStart} data-test="sign-out-button">SIGN OUT</OptionLink>
          : <OptionLink to="/signing">SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden
        ? null
        : <CartDropdown />
    }
  </HeaderContainer>
);

export const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
