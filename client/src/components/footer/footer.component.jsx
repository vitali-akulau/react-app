import React from 'react';
import { ReactComponent as Logo } from '../../static/crown.svg';
import { ReactComponent as InLogo } from '../../static/linkedin.svg';
import { ReactComponent as InstagramLogo } from '../../static/instagram.svg';
import { ReactComponent as TwitterLogo } from '../../static/twitter.svg';
import { ReactComponent as FacebookLogo } from '../../static/facebook.svg';
import {
  FooterContainer,
  FooterColumnsContainer,
  LinksColumnContainer,
  FooterImageContainer,
  FooterLink
} from './footer.styles';

const Footer = () => (
  <FooterContainer>
    <FooterColumnsContainer>
      <LinksColumnContainer>
        <FooterImageContainer to="/">
          <Logo />
        </FooterImageContainer>
      </LinksColumnContainer>
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
          <li><FooterLink to="/">React</FooterLink></li>
          <li><FooterLink to="/">Redux</FooterLink></li>
          <li><FooterLink to="/">Express</FooterLink></li>
          <li><FooterLink to="/">Firebase</FooterLink></li>
          <li><FooterLink to="/">Stripe</FooterLink></li>
          <li><FooterLink to="/">Jest</FooterLink></li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <h4>JOIN US</h4>
        <FooterLink to="/"><InstagramLogo /></FooterLink>
        <FooterLink to="/"><InLogo /></FooterLink>
        <FooterLink to="/"><TwitterLogo /></FooterLink>
        <FooterLink to="/"><FacebookLogo /></FooterLink>
      </LinksColumnContainer>
    </FooterColumnsContainer>
  </FooterContainer>
);

export default Footer;
