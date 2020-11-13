import React from 'react';
import { ReactComponent as Logo } from '../../static/crown.svg';
import { ReactComponent as TiktokLogo } from '../../static/tiktok.svg';
import { ReactComponent as InstagramLogo } from '../../static/instagram.svg';
import { ReactComponent as TwitterLogo } from '../../static/twitter.svg';
import { ReactComponent as FacebookLogo } from '../../static/facebook.svg';
import {
  FooterContainer,
  FooterColumnsContainer,
  LinksColumnContainer,
  FooterImageContainer,
  FooterLink,
  FooterExternalLink,
  HalfSizeContainer,
} from './footer.styles';

const Footer = () => (
  <FooterContainer>
    <FooterColumnsContainer>
      <LinksColumnContainer>
        <HalfSizeContainer>
          <h4>COMPANY</h4>
          <ul>
            <li><FooterLink to="/">Careers</FooterLink></li>
            <li><FooterLink to="/contact">Contact Us</FooterLink></li>
            <li><FooterLink to="/">Terms</FooterLink></li>
            <li><FooterLink to="/">Privacy</FooterLink></li>
            <li><FooterLink to="/">Accessibility Policy</FooterLink></li>
          </ul>
        </HalfSizeContainer>
        <HalfSizeContainer>
          <h4>LEARN MORE</h4>
          <ul>
            <li><FooterExternalLink href="https://reactjs.org/">React</FooterExternalLink></li>
            <li><FooterExternalLink href="https://redux.js.org/">Redux</FooterExternalLink></li>
            <li><FooterExternalLink href="https://expressjs.com/">Express</FooterExternalLink></li>
            <li><FooterExternalLink href="https://firebase.google.com/">Firebase</FooterExternalLink></li>
            <li><FooterExternalLink href="https://stripe.com/">Stripe</FooterExternalLink></li>
            <li><FooterExternalLink href="https://jestjs.io/">Jest</FooterExternalLink></li>
          </ul>
        </HalfSizeContainer>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <ul>
          <li><FooterLink to="/"><h4>FIND A STORE</h4></FooterLink></li>
          <li><FooterLink to="/signing"><h4>SIGN UP</h4></FooterLink></li>
          <li><FooterLink to="/"><h4>BECOME A MEMBER</h4></FooterLink></li>
          <li><FooterLink to="/"><h4>SEND US FEEDBACK</h4></FooterLink></li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <FooterImageContainer to="/">
          <Logo width="125px" height="125px" />
        </FooterImageContainer>
      </LinksColumnContainer>
      <LinksColumnContainer textAlign="right">
        <h4>JOIN US</h4>
        <FooterExternalLink href="https://www.instagram.com/"><InstagramLogo /></FooterExternalLink>
        <FooterExternalLink href="https://www.tiktok.com/en/"><TiktokLogo /></FooterExternalLink>
        <FooterExternalLink href="https://twitter.com/"><TwitterLogo /></FooterExternalLink>
        <FooterExternalLink href="https://facebook.com/"><FacebookLogo /></FooterExternalLink>
      </LinksColumnContainer>
    </FooterColumnsContainer>
  </FooterContainer>
);

export default Footer;
