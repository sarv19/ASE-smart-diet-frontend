interface pagesType {
  [key: string]: string;
}

const PAGES: pagesType = {
  HOME: '/',
  MENU: '/daily-diet',
  SUMMARY: '/summary',
  DIET: '/diet',
  SETTING: '/settings'
}

export {
  PAGES
}