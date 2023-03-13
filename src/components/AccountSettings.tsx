import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

import { useAuth } from "@/modules/auth";
import getFirebase from "@/shared/getFirebase";
import { useRouter } from "next/router";

const AccountSettings = () => {
  const app = getFirebase();
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState<Record<string, string>>({});
  const router = useRouter();

  const { t } = useTranslation("", { useSuspense: false });
  const { currentUser } = useAuth();
  const onFinish = async (values: any) => {
    const col = doc(db, "users", currentUser?.uid || "");
    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) values[key] = null;
    });
    await updateDoc(col, values);
    router.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const getUserSettings = async () => {
      const col = doc(db, "users", currentUser?.uid || "");
      const userInfo = (await getDoc(col)).data();
      setUserInfo(userInfo as any);
    };
    currentUser?.uid && getUserSettings();
  }, [currentUser?.uid, db]);

  return (
    <div className="account-setting">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<div>{t("Email")}</div>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder={userInfo.email} />
        </Form.Item>
        <Form.Item label={<div>{t("Name")}</div>} name="name">
          <Input placeholder={userInfo.name} />
        </Form.Item>
        <Form.Item label={<div>{t("Gender")}</div>} name="gender">
          <Input placeholder={userInfo.gender} />
        </Form.Item>
        <Form.Item label={<div>{t("Address")}</div>} name="address">
          <Input placeholder={userInfo.address} />
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
