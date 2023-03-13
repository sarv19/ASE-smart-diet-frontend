import { Tabs, TabsProps } from "antd";
import { useTranslation } from 'react-i18next';
import Head from "next/head";
import { AccountSettings, DietSettings, FoodPreferences, Header } from "../components";

const Setting = () => {
  const { t } = useTranslation('', { useSuspense: false });
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
    <div style={{maxWidth: '1440px', margin: 'auto'}}>
      <Head>
        {/* <title>{t("Settings")}</title> */}
      </Head>
      <div>
        {/* Causing hydration */}
        <Header text={t("Diet")} />
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={() =>{}} />
    </div>
  )
};

export default Setting;