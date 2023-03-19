import { capitalizeFirstLetter } from '@/components/utils';
import { useRouter } from 'next/router';
import{ useState } from 'react';
import { useTranslation } from 'react-i18next';

const nutritionList = ['calories', 'protein', 'carbohydrate', 'fat', 'minerals'];

const initialValues = nutritionList.map(item => ({
    nutritionType: item,
    min: '',
    max: ''
}))

const alertMessage = 'Are you sure you want to create a new diet and override the current one?';

const DietForm = () => {
    const [values, setValues] = useState(initialValues);

    const router = useRouter();
    const { t } = useTranslation('', { useSuspense: false });

    const handleInputChange = (e: any, i: number) => {
        const { name, value } = e.target;

        const list: any = [...values];
        list[i][name] = value;
        setValues(list);

    };
    
    function handleSubmit(event: any) {
        event.preventDefault();
        if (window.confirm(alertMessage)) {
            return router.push('/settings');
        } else return;
    }

    return (
        <div className='diet-form'>
            <form onSubmit={handleSubmit}>
                { initialValues.map((item: any, i: number) => 
                    <div key={i} className='input-group'>
                        <div className='input-group-title'>{ capitalizeFirstLetter(item.nutritionType) }</div>
                        <input
                            name='min'
                            placeholder={t('Min Value') || 'Min Value'}
                            value={values[i].min}
                            type='number'
                            required={i === 0}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <input
                            name='max'
                            placeholder={t('Max Value') || 'Max Value'}
                            value={values[i].max}
                            type='numbe r'
                            required={i === 0}
                            onChange={e => handleInputChange(e, i)}
                        />
                    </div>
                )}
                <div className='submit-btn'>
                    <button type='submit'> {t('Submit')} </button>
                </div>
            </form>
        </div>
    )
};

export default DietForm;