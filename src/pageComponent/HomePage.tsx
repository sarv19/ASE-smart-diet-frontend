import Head from "next/head";
import Link from "next/link";
import { Suspense } from "react";
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation('', { useSuspense: false });
  return (
    <Suspense fallback='loading'>
      <div className="homepage">
        <Head>
          <title>{t('Smart Diet Homepage')}</title>
        </Head>
        <div className="homepage-img">
          <img src={'static/images/right_place.svg'} alt='Working girl'/>
        </div>
        <div className="homepage-content">
          <div className="homepage-content-title">{t('Welcome back')}</div>
          <div className="homepage-content-subtitle">{t('What would you like to do today?')}</div>
          <Link href={'/daily-diet'} className="homepage-content-btn">
            <button>{t('Check meals')}</button>
          </Link>
          <Link href={'/diet'} className="homepage-content-btn">
            <button>{t('See my diet')}</button>
          </Link>
          <Link href={'/summary'} className="homepage-content-btn">
            <button>{t('Progess summary')}</button>
          </Link>
        </div>
      </div>
    </Suspense>
  )
};

export default HomePage;