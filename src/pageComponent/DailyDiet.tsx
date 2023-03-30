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

  const items: TabsProps["items"] = [
    {
      key: "breakfast",
      label: t("Breakfast"),
      children: (
        <TableComponent
          mealId={dataBreakfast?.mealId}
          tableData={dataBreakfast?.ingredients}
          setCalories={setTotalCalories}
          totalTargetCalories={dataBreakfast?.totalTargetCalories}
          mealDate={dataBreakfast?.mealDate}
        />
      ),
    },
    {
      key: "lunch",
      label: t("Lunch"),
      children: (
        <TableComponent
          mealId={dataLunch?.mealId}
          tableData={dataLunch?.ingredients}
          setCalories={setTotalCalories}
          totalTargetCalories={dataLunch?.totalTargetCalories}
          mealDate={dataLunch?.mealDate}
        />
      ),
    },
    {
      key: "dinner",
      label: t("Dinner"),
      children: (
        <TableComponent
          mealId={dataDinner?.mealId}
          tableData={dataDinner?.ingredients}
          setCalories={setTotalCalories}
          totalTargetCalories={dataDinner?.totalTargetCalories}
          mealDate={dataDinner?.mealDate}
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
      </div>
      {
        (
          isLoadingBreakfast ||
          isLoadingLunch ||
          isLoadingDinner ||
          !dataLunch ||
          !dataBreakfast ||
          !dataDinner
        ) ?
          <div className="page-spinner">
            <Spin />
          </div> :
          <Tabs defaultActiveKey="1" items={items} />
      }
    </div>
  );
};

export default DailyDiet;
