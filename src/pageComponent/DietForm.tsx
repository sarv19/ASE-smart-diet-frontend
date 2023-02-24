import { capitalizeFirstLetter } from '@/components/utils';
import{ useState } from 'react';

const nutritionList = ['calories', 'protein', 'carbohydrate', 'fat', 'minerals'];

const initialValues = nutritionList.map(item => ({
    nutritionType: item,
    min: '',
    max: ''
}))

const DietForm = () => {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e: any, i: number) => {
        const { name, value } = e.target;

        const list: any = [...values];
        list[i][name] = value;
        setValues(list);

    };
    
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log('submited: ', values)
    }

    return (
        <div className='diet-form'>
            <form onSubmit={handleSubmit}>
                { initialValues.map((item: any, i: number) => 
                    <div key={i} className='input-group'>
                        <div>{ capitalizeFirstLetter(item.nutritionType) }</div>
                        <input
                            name='min'
                            placeholder='Min Value'
                            value={values[i].min}
                            type='number'
                            onChange={e => handleInputChange(e, i)}
                        />
                        <input
                            name='max'
                            placeholder='Max Value'
                            value={values[i].max}
                            type='number'
                            onChange={e => handleInputChange(e, i)}
                        />
                    </div>
                )}
                <div className='submit-btn'>
                    <button  type='submit'> Submit </button>
                </div>
            </form>
        </div>
    )
};

export default DietForm;