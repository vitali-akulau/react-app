import React from 'react';
import { ReactComponent as TiktokLogo } from '../../static/icons/tiktok.svg';
import { ReactComponent as InstagramLogo } from '../../static/icons/instagram.svg';
import { ReactComponent as TwitterLogo } from '../../static/icons/twitter.svg';
import { ReactComponent as FacebookLogo } from '../../static/icons/facebook.svg';
import {
  FooterContainer,
  FooterColumnsContainer,
  LinksColumnContainer,
  FooterLink,
  FooterExternalLink,
} from './footer.styles';

const Footer = () => (
  <FooterContainer>
    <FooterColumnsContainer>
      <LinksColumnContainer>
        <h4>COMPANY</h4>
        <ul>
          <li><FooterLink to="/">Careers</FooterLink></li>
          <li><FooterLink to="/contact">Contact Us</FooterLink></li>
          <li><FooterLink to="/">Terms</FooterLink></li>
          <li><FooterLink to="/">Privacy</FooterLink></li>
          <li><FooterLink to="/">Accessibility Policy</FooterLink></li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <h4>LEARN MORE</h4>
        <ul>
          <li><FooterExternalLink href="https://reactjs.org/">React</FooterExternalLink></li>
          <li><FooterExternalLink href="https://redux.js.org/">Redux</FooterExternalLink></li>
          <li><FooterExternalLink href="https://expressjs.com/">Express</FooterExternalLink></li>
          <li><FooterExternalLink href="https://firebase.google.com/">Firebase</FooterExternalLink></li>
          <li><FooterExternalLink href="https://stripe.com/">Stripe</FooterExternalLink></li>
          <li><FooterExternalLink href="https://jestjs.io/">Jest</FooterExternalLink></li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <ul>
          <li><FooterLink to="/"><h4>FIND A STORE</h4></FooterLink></li>
          <li><FooterLink to="/signing"><h4>SIGN UP</h4></FooterLink></li>
          <li><FooterLink to="/"><h4>BECOME A MEMBER</h4></FooterLink></li>
          <li><FooterLink to="/"><h4>SEND US FEEDBACK</h4></FooterLink></li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer textAlign="right" blocks={3} float="right">
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
