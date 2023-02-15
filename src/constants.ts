interface pagesType {
  [key: string]: string;
}

const PAGES: pagesType = {
  HOME: "/",
  MENU: "/daily-diet",
  SUMMARY: "/summary",
  DIET: "/diet",
  SETTING: "/settings",
};

export { PAGES };

export const BACKEND_BASE_URL = "http://3.17.69.128:8080";
