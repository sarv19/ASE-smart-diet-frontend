import { useTranslation } from 'react-i18next';

const CommingSoon = () => {
  const { t } = useTranslation('', { useSuspense: false });

  return (
    <div className="commingsoon">
      <img className="commingsoon-image" src={'static/images/commingsoon.svg'} />
      <div className="commingsoon-text">{t('Comming Soon')}</div>
    </div>
  )
};

export default CommingSoon;