import { Button, Form, Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useAuth } from "@/modules/auth";
import * as settings from "@/modules/settings/basic/actions";

const AccountSettings = () => {
  const { t } = useTranslation("", { useSuspense: false });

  const { currentUser } = useAuth();

  const { data, isLoading } = useQuery({
    queryFn: () => settings.get(currentUser?.uid || ""),
    queryKey: [settings.get.key, currentUser?.uid],
    enabled: !!currentUser,
  });
  const { mutate } = useMutation({
    mutationFn: (values) => settings.put(currentUser?.uid || "", values),
  });

  const onFinish = async (values: any) => mutate(values);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading)
    return (
      <div className="page-spinner">
        <Spin />
      </div>
    );

  return (
    <div className="account-setting">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        labelWrap
        style={{ width: "100%" }}
        initialValues={{
          ...data,
          email: currentUser?.email
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<div>{t("Email")}</div>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item label={<div>{t("Name")}</div>} name="name">
          <Input />
        </Form.Item>
        <Form.Item label={<div>{t("Gender")}</div>} name="gender">
          <Input />
        </Form.Item>
        <Form.Item label={<div>{t("Address")}</div>} name="address">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {<div>{t("Submit")}</div>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountSettings;
