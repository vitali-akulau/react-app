import React from 'react';
import { FooterContainer, FooterLinksContainer, LinksColumnContainer } from './footer.styles';

const Footer = () => (
  <FooterContainer>
    <FooterLinksContainer>
      <LinksColumnContainer>
        <h4>Image</h4>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <h4>Department</h4>
        <ul>
          <li>Our goals</li>
          <li>Careers</li>
          <li>Internship</li>
          <li>Educational courses</li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <h4>Technologies</h4>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Express</li>
          <li>Firebase</li>
          <li>Stripe</li>
          <li>Jest</li>
        </ul>
      </LinksColumnContainer>
      <LinksColumnContainer>
        <h4>Other</h4>
        <ul>
          <li>ALMA MATER</li>
          <li>Deploy this locally</li>
          <li>How to test?</li>
        </ul>
      </LinksColumnContainer>
    </FooterLinksContainer>
  </FooterContainer>
);

export default Footer;
