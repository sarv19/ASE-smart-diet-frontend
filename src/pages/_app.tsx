import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'


import React, { Children } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { PAGES } from '../constants';
import { DietIcon, HomeIcon, MenuIcon, ReportIcon, SettingIcon } from '../pageComponent/Icons';

const { Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
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

  const router = useRouter();
  const handleClick = (e: any) => {
    let path = PAGES[`${e.key}`];  
    router.push(path);
  }

  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#960018',
            colorBgLayout: '#fff'
          },
          components: {}
          }
        }
      >
    <Layout hasSider style={{height: '100vh'}}>
      <ConfigProvider
        theme={{
          token: {
            controlItemBgActive: '#700012',
            colorBgContainer: '#960018',
            colorPrimary: '#fff',
            colorText: '#fff'
          },
          components: {}
          }
        }
      >
        <Sider
        className='baselayout-sider'
        collapsed
        breakpoint="sm"
        style={{
          overflow: 'auto',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu mode="inline" defaultSelectedKeys={['1']} items={items} onClick={handleClick} />
      </Sider>
      </ConfigProvider>
      <Layout className="site-layout" style={{ padding: '0 30px', overflow: 'auto', maxWidth: '1440px',  margin: '0 auto' }}>
        <Content style={{ }}>
          <Component {...pageProps} />
        </Content>
        {/* <Footer>Smart Diet ©2023 Created by Team 42</Footer> */}
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};
