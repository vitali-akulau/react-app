const BasePage = require('./basepage.page');

class HomepagePage extends BasePage {
  get directoryMenu() {
    return $('#directory-menu');
  }

  getMenuSectionByName(sectionName) {
    return this.directoryMenu.$(`span=${sectionName.toUpperCase()}`);
  }

  openOverviewPage(sectionName) {
    this.getMenuSectionByName(sectionName).click();
  }
}

module.exports = new HomepagePage();
