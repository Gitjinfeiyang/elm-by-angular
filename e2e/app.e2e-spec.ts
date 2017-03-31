import { HelloAppPage } from './app.po';

describe('hello-angular App', () => {
  let page: HelloAppPage;

  beforeEach(() => {
    page = new HelloAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
