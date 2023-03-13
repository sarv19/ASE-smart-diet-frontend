import { Button, Form, Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

const FoodPreferences = () => {

  const { t } = useTranslation('', { useSuspense: false });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const options: SelectProps['options'] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Peanut', value: 'Peanut' },
  ];

  return (
    <div className="food-pref-setting">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<div>{t('Prefered Ingredients')}</div>}
          name="preferedIngredients"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['Chicken', 'Pork']}
            // onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label={<div>{t('Unwanted Ingredients')}</div>}
          name="unwantedIngredients"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['Beef']}
            // onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label={<div>{t('Allergens')}</div>}
          name="allergens"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['Peanut', 'Almond']}
            // onChange={handleChange}
            options={options}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {<div>{t('Submit')}</div>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FoodPreferences;
