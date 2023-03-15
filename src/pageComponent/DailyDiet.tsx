import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin, Tabs, TabsProps } from "antd";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import Head from "next/head";

import { useAuth } from "@/modules/auth";
import * as dailyDiet from "@/modules/dailyDiet/actions";

import { Header, TableComponent } from "../components";
import data from "../data/data.json";

const DailyDiet: React.FC = () => {
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const { t } = useTranslation("", { useSuspense: false });

  const { currentUser } = useAuth();

  const { data: dataBreakfast, isLoading: isLoadingBreakfast } = useQuery({
    queryFn: async () =>
      dailyDiet.get("breakfast", (await currentUser?.getIdToken()) || ""),
    queryKey: [dailyDiet.get.key, "breakfast", currentUser?.uid],
    enabled: !!currentUser,
  });
  const { data: dataLunch, isLoading: isLoadingLunch } = useQuery({
    queryFn: async () =>
      dailyDiet.get("lunch", (await currentUser?.getIdToken()) || ""),
    queryKey: [dailyDiet.get.key, "lunch", currentUser?.uid],
    enabled: !!currentUser,
  });
  const { data: dataDinner, isLoading: isLoadingDinner } = useQuery({
    queryFn: async () =>
      dailyDiet.get("dinner", (await currentUser?.getIdToken()) || ""),
    queryKey: [dailyDiet.get.key, "dinner", currentUser?.uid],
    enabled: !!currentUser,
  });

  if (
    isLoadingBreakfast ||
    isLoadingLunch ||
    isLoadingDinner ||
    !dataLunch ||
    !dataBreakfast ||
    !dataDinner
  )
    return (
      <div className="account-setting">
        <Spin />
      </div>
    );

  const items: TabsProps["items"] = [
    {
      key: "breakfast",
      label: t("Breakfast"),
      children: (
        <TableComponent
          mealId={dataBreakfast.mealId}
          tableData={dataBreakfast.ingredients}
          setCalories={setTotalCalories}
        />
      ),
    },
    {
      key: "lunch",
      label: t("Lunch"),
      children: (
        <TableComponent
          mealId={dataLunch.mealId}
          tableData={dataLunch.ingredients}
          setCalories={setTotalCalories}
        />
      ),
    },
    {
      key: "dinner",
      label: t("Dinner"),
      children: (
        <TableComponent
          mealId={dataDinner.mealId}
          tableData={dataDinner.ingredients}
          setCalories={setTotalCalories}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1440px", margin: "auto" }}>
      <Head>
        <title>{t("Daily diet")}</title>
      </Head>
      <div className="daily-diet-header">
        {/* Causing hydration */}
        <Header text={t("Today's menu")} />
        <div className="daily-diet-header-calories">
          <p className="daily-diet-header-calories-target">
            <b>{t("Target calories")}:</b> 400-500
          </p>
          <p
            className={classnames(
              "daily-diet-header-calories-sum",
              { warning: totalCalories > 500 },
              { good: totalCalories > 400 && totalCalories < 500 }
            )}
          >
            <b>{t("Temporary calories sum")}:</b> {totalCalories}
          </p>
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default DailyDiet;
