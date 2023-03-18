import { Tabs, TabsProps } from "antd";
import { useTranslation } from 'react-i18next';
import Head from "next/head";
import { Suspense } from "react";
import { AccountSettings, DietSettings, FoodPreferences, Header } from "../components";
import { useRouter } from "next/router";

const Setting = () => {
  const { t } = useTranslation('', { useSuspense: false });
  const router = useRouter();
  const items: TabsProps["items"] = [
    {
      key: "account",
      label: t('Account'),
      children: <AccountSettings />,
    },
    {
      key: "foorPreferences",
      label: t('Food Preferences'),
      children: <FoodPreferences />,
    },
    {
      key: "diet",
      label: t('Diet'),
      children: <DietSettings />,
    },
  ];

  return (
    <Suspense fallback='loading'>
      <div style={{maxWidth: '1440px', margin: 'auto'}}>
        <Head>
          <title>{t("Settings")}</title>
        </Head>
        <div>
          {/* Causing hydration */}
          <Header text={t("Diet")} />
        </div>
        <Tabs defaultActiveKey={router?.query?.tab == 'diet'? 'diet' : 'account'} items={items} onChange={() =>{}} />
      </div>
    </Suspense>
  )
};

export default Setting;