import { Progress, Spin } from "antd";
import Head from "next/head";
import { ImageAndContent, Header } from "../components";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import * as summaryAction from "@/modules/summary/actions";
import { useAuth } from "@/modules/auth";

const mockData = {
  breakfast: {
    calories: 415,
    nutrients: {
      Protein: 100,
      Fat: 10,
      Carbohydrate: 15,
      Vintamin: 5,
    },
  },
  lunch: {},
  dinner: {},
};


const Summary = () => {
  const { t } = useTranslation("", { useSuspense: false });
  const { currentUser } = useAuth();

  const { data: summaryData, isLoading: isLoadingSummary } = useQuery({
    queryFn: async () =>
    summaryAction.get((await currentUser?.getIdToken()) || ""),
    queryKey: [summaryAction.get.key, "breakfast", currentUser?.uid],
    enabled: !!currentUser,
  });

  if (isLoadingSummary) return <div className="page-spinner"><Spin /></div>;

  return (
    <div className="summary">
      <Head>
        <title>{t("Summary")}</title>
      </Head>
      <Header text={t("Today's summary")} />
      <div className="progress-bar">
        <Progress
          percent={20.75}
          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
        />
        <div className="progress-bar-sumup">415 / 2000 {t("calories")}</div>
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
