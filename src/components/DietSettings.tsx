import { Button, Form, InputNumber, Slider, Space } from 'antd';
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
        >
          <Space>
            <Form.Item noStyle name="minCal">
              <InputNumber style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item noStyle name="maxCal">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item
          label={<div>{t('Protein (mg)')}</div>}
        >
          <Space>
            <Form.Item noStyle name="minProtein">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item noStyle name="maxProtein">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item
          label={<div>{t('Carbohydrates (mg)')}</div>}
        >
          <Space>
            <Form.Item noStyle name="minCarb">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item noStyle name="maxCarb">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item
          label={<div>{t('Fat (mg)')}</div>}
        >
          <Space>
            <Form.Item noStyle name="minFat">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item noStyle name="maxFat">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item
          label={<div>{t('Minerals (mg)')}</div>}
        >
          <Space>
            <Form.Item noStyle name="minMinerals">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item noStyle name="maxMinerals">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Space>
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