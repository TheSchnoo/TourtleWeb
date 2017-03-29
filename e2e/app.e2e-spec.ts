import { TourtleWebPage } from './app.po';

describe('tourtle-web App', () => {
  let page: TourtleWebPage;

  beforeEach(() => {
    page = new TourtleWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
