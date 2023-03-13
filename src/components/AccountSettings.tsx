import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const AccountSettings = () => {

  const { t } = useTranslation('', { useSuspense: false });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div className="account-setting">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<div>{t('Email')}</div>}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<div>{t('Name')}</div>}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<div>{t('Gender')}</div>}
          name="gender"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<div>{t('Address')}</div>}
          name="address"
        >
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {<div>{t('Submit')}</div>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AccountSettings;