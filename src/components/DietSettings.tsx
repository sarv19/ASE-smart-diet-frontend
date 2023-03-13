import { Button, Form, Slider } from 'antd';
import { useTranslation } from 'react-i18next';

const DietSettings = () => {

  const { t } = useTranslation('', { useSuspense: false });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
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
          label={<div>{t('Calories')}</div>}
          name="calories"
        >
          <Slider
          min={0}
          step={10}
          max={2000}
          range
        />
        </Form.Item>
        <Form.Item
          label={<div>{t('Protein (mg)')}</div>}
          name="unwantedIngredients"
        >
          <Slider
          min={0}
          step={10}
          max={2000}
          range
          />
        </Form.Item>
        <Form.Item
          label={<div>{t('Carbohydrates (mg)')}</div>}
          name="carbohydrates"
        >
          <Slider
          min={0}
          step={10}
          max={2000}
          range
          />
        </Form.Item>

        <Form.Item
          label={<div>{t('Fat (mg)')}</div>}
          name="fat"
        >
          <Slider
          min={0}
          step={10}
          max={2000}
          range
          />
        </Form.Item>

        <Form.Item
          label={<div>{t('Minerals (mg)')}</div>}
          name="minerals"
        >
          <Slider
          min={0}
          step={10}
          max={2000}
          range
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {<div>{t('Submit')}</div>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default DietSettings;