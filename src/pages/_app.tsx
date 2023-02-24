import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import React, { Children } from "react";
import { MenuProps, Tooltip } from "antd";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { BarsOutlined } from '@ant-design/icons'; 

import { AuthContext, useAuth } from "@/modules/auth";

import { PAGES } from "../constants";
import {
  DietIcon,
  HomeIcon,
  MenuIcon,
  ReportIcon,
  SettingIcon,
} from "../pageComponent/Icons";

const { Content, Footer, Sider } = Layout;

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

  const { signIn, authState, signOut  } = useAuth();

  const sideBarRef = React.useRef<any>(null);

  const router = useRouter();
  const handleClick = (e: any) => {
    let path = PAGES[`${e.key}`];
    router.push(path);
  };

  const handleSideBarControl = () => {
    sideBarRef.current?.classList.toggle("sider-container-active");
  }

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
                  defaultSelectedKeys={["1"]}
                  items={items}
                  onClick={handleClick}
                />
                <Tooltip placement="right" title={'Log out'} className='logout-btn'>
                  <button onClick={authState === "signedOut" ? signIn : signOut}>
                    <img src="https://img.icons8.com/ios/50/FFFFFF/logout-rounded-left.png" alt='logout-btn'/>
                  </button>
                </Tooltip>
              </Sider>
              <button className="sider-container-button" onClick={handleSideBarControl}>
                <BarsOutlined className="sider-container-button-icon"/>
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
