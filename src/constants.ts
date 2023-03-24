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

const manualLinkEnglish = 'https://uwin365-my.sharepoint.com/:b:/g/personal/vongocq_uwindsor_ca/EYywOwpEOzRHvLZX7R-ESpkBCZ9fyTdfm-hXTVc2_FWs_A?e=yj0Zbu';
const manualLinkFrench = 'https://uwin365-my.sharepoint.com/:b:/g/personal/vongocq_uwindsor_ca/EX6xkNd4PBlCvWFXV5TbtpEBsvH7Q_CZFN4gs2d0suLZvg?e=h8MLNo';

export { PAGES, manualLinkEnglish, manualLinkFrench };

export const BACKEND_BASE_URL = "http://3.17.69.128:8080";
