const Homepage = require('../pages/homepage.page');
const ShopPage = require('../pages/shop.page');
const getMockedState = require('../../utils/mock-state-provider');
const { getRandomSection } = require('../service/data-providers');
const { shop: shopLink, contact: contactLink, signing: signingLink } = require('../support/relative-urls');

describe('Homepage', () => {
  beforeEach(() => {
    Homepage.open('/');
  });

  describe('Header', () => {
    it("TA-67: User should be able to navigate to 'Shop' page", () => {
      Homepage.openShopPage();
      expect(browser.getUrl()).toContain(shopLink);
    });

    it("TA-68: User should be able to navigate to 'Contact' page", () => {
      Homepage.openContactPage();
      expect(browser.getUrl()).toContain(contactLink);
    });

    it("TA-69: User should be able to navigate to 'Signing' page", () => {
      Homepage.openSigningPage();
      expect(browser.getUrl()).toContain(signingLink);
    });

    it('TA-69.2: Clicking on website logo directs user to homepage', () => {
      Homepage.open(shopLink);
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
});
