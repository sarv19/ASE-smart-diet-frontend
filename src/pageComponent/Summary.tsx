import { Button, DatePicker, DatePickerProps, Progress, Spin } from "antd";
import Head from "next/head";
import { ImageAndContent, Header } from "../components";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as summaryAction from "@/modules/summary/actions";
import { useAuth } from "@/modules/auth";
import { use, useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';
import { downloadPdf } from "@/components/SummaryReport";

const Summary = () => {
  const { t } = useTranslation("", { useSuspense: false });
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(dayjs().locale('fr-FR').format('DD-MMM-YYYY'));
  const [summaryData, setSummaryData] = useState<any>();

  const { data: allIngredients, isLoading: isLoadingIngredients } = useQuery({
    queryFn: async () =>
      summaryAction.getAllIngredients((await currentUser?.getIdToken()) || ""),
    queryKey: [currentUser?.uid],
    enabled: !!currentUser,
  });

  const { data: summaries, isLoading: isLoadingSummary } = useQuery({
    queryFn: async () =>
      summaryAction.get({ day: 0 }, (await currentUser?.getIdToken()) || ""),
    queryKey: ['getSummary'],
    enabled: !!currentUser,
  });

  const { mutate, isLoading } = useMutation<
    unknown,
    unknown,
    any,
    unknown
  >({
    mutationFn: async (day) => {
      return currentUser && summaryAction.get(day, (await currentUser?.getIdToken()) || "");
    },
    onSuccess: (result: any) => {
      setSummaryData(result)
    }
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

  useEffect(() => {
    setSummaryData(summaries)
  }, [summaries])

  const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      setCurrentDate(dayjs(dateString).format('DD-MMM-YYYY'));
      mutate({
        day: dayjs().diff(date, 'd')
      });
    }
  };

  return (
    <div className="summary">
      <Head>
        <title>{t("Summary")}</title>
      </Head>
      <Header text={t("Summary")} />
      <div className="summary-ctas">
        <div className="summary-ctas-date">{t("Choose a date to show  summary")}:&nbsp;
          <DatePicker
            defaultValue={dayjs()}
            onChange={handleChangeDate}
          />
        </div>
        <Button onClick={() => downloadPdf(summaryData, allIngredients?.data, currentDate, t)}>{t("Download Report")}</Button>
      </div>
      <div className="progress-bar">
        <Progress
          percent={calculateCalories / summaryData?.userTarget?.targetCaloriesMax * 100}
          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
        />
        <div className="progress-bar-sumup">{`${calculateCalories} / ${summaryData?.userTarget?.targetCaloriesMax}`} {t("calories")}</div>
      </div>
      {
        (isLoadingSummary || isLoading || isLoadingIngredients) ? <div className="page-spinner"><Spin /></div> :
          <>
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
          </>
      }
    </div>
  );
};

export default Summary;
