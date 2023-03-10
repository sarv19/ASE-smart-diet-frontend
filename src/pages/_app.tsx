import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MenuProps, Switch, Tooltip } from "antd";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { AuthContext, useAuth } from "@/modules/auth";
import { PAGES } from "../constants";
import { useTranslation } from "react-i18next";
import {
  DietIcon,
  HomeIcon,
  MenuIcon,
  ReportIcon,
  SettingIcon,
} from "../pageComponent/Icons";
import { getKeyByValue } from "@/components/utils";

// import i18n (needs to be bundled ;))
import "../../i18n";

const { Content, Sider } = Layout;

const items: MenuProps["items"] = [
  HomeIcon,
  MenuIcon,
  ReportIcon,
  DietIcon,
  SettingIcon,
].map((icon, index) => ({
  key: Object.keys(PAGES)[index],
  icon: React.createElement(icon),
  // label: Object.keys(PAGES)[index],
}));

export default function App({ Component, pageProps }: AppProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { signIn, authState, signOut } = useAuth();

  const { t, i18n } = useTranslation("", { useSuspense: false });
  const [currentLng, setCurrentLang] = useState("en-CA");

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

  //TO DO: fix the logic to make the btn show the right language when the app 1st loads
  useEffect(() => {
    if (currentLng !== i18n.language) setCurrentLang(i18n.language);
  }, [currentLng, i18n.language]);

  return (
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
                      {i18n.isInitialized && typeof window !== "undefined" && (
                        <Switch
                          checkedChildren="EN"
                          unCheckedChildren="FR"
                          checked={i18n.language === "en-CA"}
                          onChange={handleChangeLanguage}
                        />
                      )}
                    </ConfigProvider>
                  </div>
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
            {/* <Footer>Smart Diet ©2023 Created by Team 42</Footer> */}
          </Layout>
        </Layout>
      </ConfigProvider>
    </AuthContext>
  );
}
