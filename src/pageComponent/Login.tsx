import Head from "next/head";
import { useTranslation } from 'react-i18next';

const Login = ({ handleLogin }: any) => {
  const { t } = useTranslation('', { useSuspense: false });

  return (
    <div className='login-page'>
      <Head>
        <title>{t('Signing in')}</title>
      </Head>
      <div className='login-page-left'>
      </div>
      <div className='login-page-right'>
      </div>
      <div className='login-page-content'>
        <div className='login-page-content-left'>
          <div className='login-page-content-left-body'>
            <div className='login-page-content-left-body-title'>{t('Healthy life')}<br/>{t('starts here')}</div>
            <div>{t('Join us for a Smart diet')}</div>
          </div>
          <img src='/static/images/donut.svg' alt='donut'/>
        </div>
        <div className='login-page-content-right'>
          <div className='login-page-content-right-welcome'>{t('Welcome back')}</div>
          <button onClick={ handleLogin } className='login-page-content-right-login'>
            <img src='/static/images/google-logo.png' alt='google-logo'/>
            <div className='login-page-content-right-login-content'>{t('Continue with Google')}</div>
          </button>
        </div>
      </div>
      <img className='bg-right-top' src='/static/images/graduation.svg' alt='donut'/>
    </div>
  );
};

export default Login;