const Homepage = require('../pages/homepage.page');
const ShopPage = require('../pages/shop.page');
const getMockedState = require('../../utils/mock-state-provider');
const { getRandomSection } = require('../service/data-providers');

describe('Homepage', () => {
  beforeEach(() => {
    Homepage.open('/');
  });

  describe('Header', () => {
    it("TA-67: User should be able to navigate to 'Shop' page", () => {
      Homepage.openShopPage();
      expect(browser.getUrl()).toContain('/shop');
    });

    it("TA-68: User should be able to navigate to 'Contact' page", () => {
      Homepage.openContactPage();
      expect(browser.getUrl()).toContain('/contact');
    });

    it("TA-69: User should be able to navigate to 'Signing' page", () => {
      Homepage.openSigningPage();
      expect(browser.getUrl()).toContain('/signing');
    });

    it('TA-69.2: Clicking on website logo directs user to homepage', () => {
      const currentPath = '/shop';

      Homepage.open(currentPath);
      ShopPage.clickOnHeaderLogo();
      expect(Homepage.directoryMenu.isDisplayed()).toBe(true);
    });
  });

  describe('Directory Menu', () => {
    it('TA-69.1: User should be able to open collection page', () => {
      const { directory } = getMockedState(['directory']);
      const section = getRandomSection(directory.sections);

      Homepage.openOverviewPage(section.title);
      expect(browser.getUrl()).toContain(section.linkUrl);
    });
  });

  describe('Footer', () => {
    describe('"Company" links', () => {
      const containerName = 'company';
      const linkText = ['Careers', 'Contact Us', 'Terms', 'Privacy', 'Accessibility Policy'];

      linkText.forEach((link) => {
        it(`"${link}" link should exist in footer`, () => {
          expect(Homepage.getFooterLink(containerName, link).isDisplayed()).toBe(true);
        });
      });
    });

    describe('"Learn More" links', () => {
      const containerName = 'learn-more';
      const linkText = ['React', 'Redux', 'Express', 'Firebase', 'Stripe', 'Jest'];

      linkText.forEach((link) => {
        it(`"${link}" link should exist in footer`, () => {
          expect(Homepage.getFooterLink(containerName, link).isDisplayed()).toBe(true);
        });
      });
    });

    describe('"Engagement" links', () => {
      const containerName = 'engagement';
      const linkText = ['FIND A STORE', 'SIGN UP', 'BECOME A MEMBER', 'SEND US FEEDBACK'];

      linkText.forEach((link) => {
        it(`"${link}" link should exist in footer`, () => {
          expect(Homepage.getFooterLink(containerName, link).isDisplayed()).toBe(true);
        });
      });
    });

    describe('"Engagement" links', () => {
      const containerName = 'smm';
      const urls = [
        'https://www.instagram.com/',
        'https://www.tiktok.com/en/',
        'https://twitter.com/',
        'https://facebook.com/',
      ];

      urls.forEach((url) => {
        it(`"${url}" link should exist in footer`, () => {
          expect(Homepage.getFooterSMMLink(containerName, url).isDisplayed()).toBe(true);
        });
      });
    });
  });
});
