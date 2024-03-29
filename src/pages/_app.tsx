import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MenuProps, Switch, Tooltip } from "antd";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthContext, useAuth } from "@/modules/auth";
import { getKeyByValue } from "@/components/utils";

import { manualLinkEnglish, manualLinkFrench, PAGES } from "../constants";
import { useTranslation } from "react-i18next";
import {
  DietIcon,
  HomeIcon,
  MenuIcon,
  ReportIcon,
  SettingIcon,
  InfoIcon
} from "../pageComponent/Icons";

// import i18n (needs to be bundled ;))
import "../../i18n";


const { Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  HomeIcon,
  MenuIcon,
  ReportIcon,
  DietIcon,
  SettingIcon
].map((icon, index) => ({
  key: Object.keys(PAGES)[index],
  icon: React.createElement(icon),
  // label: Object.keys(PAGES)[index],
}));

export default function App({ Component, pageProps }: AppProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const queryClient = new QueryClient();

  const { signIn, authState, signOut } = useAuth();

  const { t, i18n } = useTranslation("", { useSuspense: false });
  const [currentLng, setCurrentLang] = useState("en-CA");
  const [toggleAds, setToggleAds] = useState(true);
  const [manualLink, setManualLink] = useState(manualLinkEnglish);

  const sideBarRef = React.useRef<any>(null);

  const router = useRouter();
  const handleClick = (e: any) => {
    let path = PAGES[`${e.key}`];
    router.push(path);
  };

  const handleSideBarControl = () => {
    sideBarRef.current?.classList.toggle("sider-container-active");
  };

  function handleChangeLanguage(checked: boolean) {
    i18n.changeLanguage(checked ? "en-CA" : "fr-FR");
  }

  function handleAds() {
    setToggleAds(!toggleAds);
  }

  useEffect(() => {
    if (currentLng !== i18n.language) setCurrentLang(i18n.language);
    if (currentLng?.includes('en') || i18n.language?.includes('en')) {
      setManualLink(manualLinkEnglish);
    } else {
      setManualLink(manualLinkFrench);
    }
  }, [currentLng, i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#960018",
              colorBgLayout: "#fff",
            },
            components: {},
          }}
        >
          <Layout hasSider style={{ height: "100vh" }}>
            <ConfigProvider
              theme={{
                token: {
                  controlItemBgActive: "#700012",
                  colorBgContainer: "#960018",
                  colorPrimary: "#fff",
                  colorText: "#fff",
                },
                components: {},
              }}
            >
              <div ref={sideBarRef} className="sider-container">
                <Sider
                  className="baselayout-sider"
                  collapsed
                  breakpoint="sm"
                  style={{
                    overflow: "auto",
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <Menu
                    mode="inline"
                    selectedKeys={[
                      getKeyByValue(PAGES, router.pathname) ||
                        Object.keys(PAGES)[0],
                    ]}
                    items={items}
                    onClick={handleClick}
                  />
                  <div className="functional-btns">
                    <div className="functional-btns-lang">
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#00967E",
                            colorBgLayout: "#fff",
                          },
                          components: {},
                        }}
                      >
                        {i18n.isInitialized &&
                          typeof window !== "undefined" && (
                            <Switch
                              checkedChildren="EN"
                              unCheckedChildren="FR"
                              checked={i18n.language === "en-CA" || i18n.language === "en-US"}
                              onChange={handleChangeLanguage}
                            />
                          )}
                      </ConfigProvider>
                    </div>
                    <a className="functional-btns-info" href={manualLink} target="_blank" rel="noreferrer">
                      <InfoIcon />
                    </a>
                    <Tooltip
                      placement="right"
                      title={"Log out"}
                      className="logout-btn"
                    >
                      <button
                        onClick={authState === "signedOut" ? signIn : signOut}
                      >
                        <img
                          src="https://img.icons8.com/ios/50/FFFFFF/logout-rounded-left.png"
                          alt="logout-btn"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </Sider>
                <button
                  className="sider-container-button"
                  onClick={handleSideBarControl}
                >
                  <BarsOutlined className="sider-container-button-icon" />
                </button>
              </div>
            </ConfigProvider>
            <Layout
              className="site-layout"
              style={{
                overflow: "auto",
              }}
            >
              <Content style={{}}>
                <Component {...pageProps} />
              </Content>
              {toggleAds && 
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img style={{maxHeight: '100px', bottom: 0, position: 'fixed'}} onClick={handleAds} src="https://drdrew.com/wp-content/uploads/2016/10/ad-space-placeholder-728-x-90.png" alt="default ads" />
              </div>
              }
              {/* <Footer></Footer> */}
            </Layout>
          </Layout>
        </ConfigProvider>
      </AuthContext>
    </QueryClientProvider>
  );
}
