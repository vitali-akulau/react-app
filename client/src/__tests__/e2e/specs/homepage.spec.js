const Homepage = require('../pages/homepage.page');
const getMockedState = require('../../utils/mock-state-provider');
const { getRandomSection } = require('../service/data-providers');

describe('Homepage', () => {
  beforeEach(() => {
    Homepage.open('/');
  });

  describe('Header', () => {
    it("user should be able to navigate to 'Shop' page", () => {
      Homepage.openShopPage();
      expect(browser.getUrl()).toContain('/shop');
    });

    it("user should be able to navigate to 'Contact' page", () => {
      Homepage.openContactPage();
      expect(browser.getUrl()).toContain('/contact');
    });

    it("user should be able to navigate to 'Signing' page", () => {
      Homepage.openSigningPage();
      expect(browser.getUrl()).toContain('/signing');
    });
  });

  describe('Directory Menu', () => {
    it('user should be able to open collection page', () => {
      const { directory } = getMockedState(['directory']);
      const section = getRandomSection(directory.sections);

      Homepage.openOverviewPage(section.title);
      expect(browser.getUrl()).toContain(section.linkUrl);
    });
  });
});
