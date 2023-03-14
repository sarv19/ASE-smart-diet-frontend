import { Header } from "@/components";
import Head from "next/head";
import Link from "next/link";
import DietForm from "./DietForm";
import { Suspense } from "react";
import { useTranslation } from 'react-i18next';

const Diet = () => {
  const { t } = useTranslation('', { useSuspense: false });

  return (
    <Suspense fallback='loading'>
      <div className="diet">
        <Head>
          <title>{t('Your diet')}</title>
        </Head>
        <Header text={t('Your diet')}/>
        <div className="diet-content">
          <div className="diet-content-edit">{t('Edit your diet')} <Link href={"/settings"}>{t('here')}</Link></div>
          <div className="diet-content-or">{t('or')}</div>
          <div className="diet-content-edit">{t('Create a new one below')}:</div>
          <DietForm />
        </div>
      </div>
    </Suspense>
  )
};

export default Diet;