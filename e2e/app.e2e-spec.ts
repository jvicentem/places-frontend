import { NewPlacesFrontendPage } from './app.po';

describe('new-places-frontend App', function() {
  let page: NewPlacesFrontendPage;

  beforeEach(() => {
    page = new NewPlacesFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
