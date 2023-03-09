/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation('', { useSuspense: false });

    return (
        <div className="error-page">
            <img alt="error" src="static/images/error.png" className="error-page-img"/>
            <div className="error-page-content">
                <p className="error-page-content-title">{t('Sorry, something went wrong')}.</p>
                <p>{t("We're working on it and we'll get it fix as soon as we can")}.</p>
                <Link href={'/'}>{t('Go back')}</Link>
            </div>
        </div>
    )
}

export default Error;