import React, { useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, InputNumber, Space, Spin, notification } from "antd";
import { useTranslation } from "react-i18next";

import * as settings from "@/modules/settings/diet/actions";
import { useAuth } from "@/modules/auth";
import type { NotificationPlacement } from 'antd/es/notification/interface';

const Context = React.createContext({ name: 'Default' });

const DietSettings = () => {
  const { t } = useTranslation("", { useSuspense: false });
  const { currentUser } = useAuth();

  const { mutate } = useMutation<
    unknown,
    unknown,
    settings.PutDietArgs,
    unknown
  >({
    mutationFn: async (data) => {
      currentUser && settings.putCalories(data, currentUser);
    },
  });

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      settings.getCalories(currentUser ? await currentUser.getIdToken() : ""),
    queryKey: [settings.getCalories.key, currentUser?.uid],
    enabled: !!currentUser,
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `${t('Diet updated')}!`,
      placement,
    });
  };

  const onFinish = (values: any) => {
    localStorage.setItem("minProtein", values.minProtein || '');
    localStorage.setItem("maxProtein", values.maxProtein || '');
    localStorage.setItem("minCarb", values.minCarb || '');
    localStorage.setItem("maxCarb", values.maxCarb || '');
    localStorage.setItem("minFat", values.minFat || '');
    localStorage.setItem("maxFat", values.maxFat || '');
    // localStorage.setItem("minMinerals", values.minMinerals || '');
    // localStorage.setItem("maxMinerals", values.maxMinerals || '');
    mutate({
      targetCaloriesMax: values.maxCal,
      targetCaloriesMin: values.minCal,
    });
    openNotification('bottomLeft');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    <div>
      {isLoading ? (
        <div className="page-spinner">
          <Spin />
        </div>
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          labelWrap
          style={{ width: "100%" }}
          initialValues={{
            minCal: data.targetCaloriesMin,
            maxCal: data.targetCaloriesMax,
            minProtein: localStorage?.getItem("minProtein"),
            maxProtein: localStorage?.getItem("maxProtein"),
            minCarb: localStorage?.getItem("minCarb"),
            maxCarb: localStorage?.getItem("maxCarb"),
            minFat: localStorage?.getItem("minFat"),
            maxFat: localStorage?.getItem("maxFat"),
            // minMinerals: localStorage?.getItem("minMinerals"),
            // maxMinerals: localStorage?.getItem("maxMinerals")
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label={<div>{t("Calories")}</div>} required>
            <Space>
              <Form.Item noStyle name="minCal" rules={[{ required: true, message: "Please input your calorie restrictions!" }]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item noStyle name="maxCal" rules={[{ required: true, message: "Please input your calorie restrictions!" }]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label={<div>{t("Protein (mg)")}</div>}>
            <Space>
              <Form.Item noStyle name="minProtein">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item noStyle name="maxProtein">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label={<div>{t("Carbohydrates (mg)")}</div>}>
            <Space>
              <Form.Item noStyle name="minCarb">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item noStyle name="maxCarb">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item label={<div>{t("Fat (mg)")}</div>}>
            <Space>
              <Form.Item noStyle name="minFat">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item noStyle name="maxFat">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Space>
          </Form.Item>

          {/* <Form.Item label={<div>{t("Minerals (mg)")}</div>}>
            <Space>
              <Form.Item noStyle name="minMinerals">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item noStyle name="maxMinerals">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Space>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {<div>{t("Submit")}</div>}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
    </Context.Provider>
  );
};

export default DietSettings;
