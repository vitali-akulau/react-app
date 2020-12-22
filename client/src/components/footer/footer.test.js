import React from 'react';
import { shallow } from 'enzyme';
import Footer from './footer.component';

describe('Components: Footer', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Footer />);
  });

  it('should render 4 link containers', () => {
    expect(wrapper.find('LinksColumnContainer')).toHaveLength(4);
  });

  describe('"COMPANY" container', () => {
    let container;

    beforeEach(() => {
      container = wrapper.find('LinksColumnContainer').at(0);
    });

    it('should render container heading', () => {
      expect(container.find('h4').text()).toEqual('COMPANY');
    });

    it('should render links', () => {
      expect(container.find('FooterLink[to="/"]').at(0).text()).toEqual('Careers');
      expect(container.find('FooterLink[to="/contact"]').text()).toEqual('Contact Us');
      expect(container.find('FooterLink[to="/"]').at(1).text()).toEqual('Terms');
      expect(container.find('FooterLink[to="/"]').at(2).text()).toEqual('Privacy');
      expect(container.find('FooterLink[to="/"]').at(3).text()).toEqual('Accessibility Policy');
    });
  });

  describe('"LEARN MORE" container', () => {
    let container;

    beforeEach(() => {
      container = wrapper.find('LinksColumnContainer').at(1);
    });

    it('should render container heading', () => {
      expect(container.find('h4').text()).toEqual('LEARN MORE');
    });

    it('should render links', () => {
      expect(container.find('FooterExternalLink[href="https://reactjs.org/"]').text())
        .toEqual('React');
      expect(container.find('FooterExternalLink[href="https://redux.js.org/"]').text())
        .toEqual('Redux');
      expect(container.find('FooterExternalLink[href="https://expressjs.com/"]').text())
        .toEqual('Express');
      expect(container.find('FooterExternalLink[href="https://firebase.google.com/"]').text())
        .toEqual('Firebase');
      expect(container.find('FooterExternalLink[href="https://stripe.com/"]').text())
        .toEqual('Stripe');
      expect(container.find('FooterExternalLink[href="https://jestjs.io/"]').text())
        .toEqual('Jest');
    });
  });

  describe('"ENGAGEMENT" container', () => {
    let container;

    beforeEach(() => {
      container = wrapper.find('LinksColumnContainer').at(2);
    });

    it('should not have container heading', () => {
      expect(container.find('h4')).toEqual({});
    });

    it('should render links', () => {
      expect(container.find('FooterLink[to="/"]').at(0).text()).toEqual('FIND A STORE');
      expect(container.find('FooterLink[to="/signing"]').text()).toEqual('SIGN UP');
      expect(container.find('FooterLink[to="/"]').at(1).text()).toEqual('BECOME A MEMBER');
      expect(container.find('FooterLink[to="/"]').at(2).text()).toEqual('SEND US FEEDBACK');
    });
  });

  describe('"JOIN US" container', () => {
    let container;

    beforeEach(() => {
      container = wrapper.find('LinksColumnContainer').at(3);
    });

    it('should render container heading', () => {
      expect(container.find('h4').text()).toEqual('JOIN US');
    });

    it('should align text to right inside of container', () => {
      expect(container).toHaveStyleRule('text-align', 'right');
    });

    it('should make container floating right', () => {
      expect(container).toHaveStyleRule('text-align', 'right');
    });

    it('should render links as social media icons', () => {
      expect(container.find('FooterExternalLink[href="https://www.instagram.com/"]').find('InstagramLogo'))
        .toBeTruthy();
      expect(container.find('FooterExternalLink[href="https://www.tiktok.com/en/"]').find('TiktokLogo'))
        .toBeTruthy();
      expect(container.find('FooterExternalLink[href="https://twitter.com/"]').find('TwitterLogo'))
        .toBeTruthy();
      expect(container.find('FooterExternalLink[href="https://facebook.com/"]').find('FacebookLogo'))
        .toBeTruthy();
    });
  });
});
