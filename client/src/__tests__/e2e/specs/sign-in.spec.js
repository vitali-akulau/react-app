describe('Sign In', () => {
  it('TA-1: User should be able to sign in with valid credentials', () => {
    browser.url('/signing');
    $('[name="email"]').setValue('loripsum@yahoo.com');
    $('[name="password"]').setValue('qazwsx123');
    $('[type="submit"]=Sign In').click();
    $('div=SIGN OUT').waitForDisplayed({ timeout: 5000 });
  });
});
