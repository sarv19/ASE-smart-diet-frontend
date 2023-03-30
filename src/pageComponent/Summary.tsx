import { Button, DatePicker, Progress, Spin } from "antd";
import Head from "next/head";
import { ImageAndContent, Header } from "../components";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import * as summaryAction from "@/modules/summary/actions";
import { useAuth } from "@/modules/auth";
import { useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { downloadPdf } from "@/components/SummaryReport";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/constants";
import { transformIngredientList } from "@/components/utils";

const Summary = () => {
  const { t } = useTranslation("", { useSuspense: false });
  const { currentUser } = useAuth();

  const [allIngredients, setAllIngredients] = useState<any[]>([]);

  useEffect(() => {
    getAllIngredients();
  }, []);


  const getAllIngredients = async () => {
    console.log('user:', currentUser?.uid)
    const res = await axios.post(
      `${BACKEND_BASE_URL}/sd/ingredient/ingredientList`,
      {
        pageSize: 50
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: currentUser?.uid,
        },
      }
    )
    const data = res.data?.data?.list;
    setAllIngredients(transformIngredientList(data))
    return data;
  }

  const { data: summaryData, isLoading: isLoadingSummary } = useQuery({
    queryFn: async () =>
    summaryAction.get((await currentUser?.getIdToken()) || ""),
    queryKey: [summaryAction.get.key, "breakfast", currentUser?.uid],
    enabled: !!currentUser,
  });

  const getMealCalories = (meal: any) => {
    return meal.ingredients?.reduce((acc: any, item: any) => {
      return acc + item.calories;
    }, 0);
  };

  const calculateCalories = useMemo(() => {
    let calories = 0;
    if (summaryData?.breakfast) {
      calories += getMealCalories(summaryData?.breakfast);
    }
    if (summaryData?.lunch) {
      calories += getMealCalories(summaryData?.lunch);
    }
    if (summaryData?.dinner) {
      calories += getMealCalories(summaryData?.dinner);
    }
    return calories;
  }, [summaryData]);

  if (isLoadingSummary || allIngredients.length < 1) return <div className="page-spinner"><Spin /></div>;

  return (
    <div className="summary">
      <Head>
        <title>{t("Summary")}</title>
      </Head>
      <Header text={t("Today's summary")} />
      <div className="summary-ctas">
        <div className="summary-ctas-date">{t("Choose a date to show  summary")}:&nbsp;
          <DatePicker
            defaultValue={dayjs()}
          />
        </div>
        <Button onClick={() => downloadPdf(summaryData, allIngredients)}>{t("Download Report")}</Button>
      </div>
      <div className="progress-bar">
        <Progress
          percent={calculateCalories / summaryData?.userTarget?.targetCaloriesMax * 100}
          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
        />
        <div className="progress-bar-sumup">{`${calculateCalories} / ${summaryData?.userTarget?.targetCaloriesMax}`} {t("calories")}</div>
      </div>
      <ImageAndContent
        image={"static/images/breakfast.png"}
        title={t("Breakfast") || "Breakfast"}
        content={summaryData?.breakfast}
      />
      <ImageAndContent
        image={"static/images/cooking.png"}
        title={t("Lunch") || "Lunch"}
        content={summaryData?.lunch}
        reverse
      />
      <ImageAndContent
        image={"static/images/snack.png"}
        title={t("Dinner") || "Dinner"}
        content={summaryData?.dinner}
      />
    </div>
  );
};

export default Summary;
