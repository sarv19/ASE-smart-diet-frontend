import React, { useCallback, useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import classnames from 'classnames'

import { useAuth } from "@/modules/auth";

import { Header, TableComponent } from "../components";
import data from "../data/data.json";
import Head from "next/head";

interface DataType {
  ingredientId: React.Key;
  ingredientName: string;
  calories: number;
  quantity: number;
  weight: number;
  substitute?: DataType[];
}

type GetMealPlanResponse = {
  userId: number;
  pageNum: number;
  pageSize: number;
  mealType: string;
  mealId?: number;
};

const DailyDiet: React.FC = () => {
  const [ingredientList, setIngredientList] = useState<DataType[]>();
  const [mealId, setMealId] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const { currentUser } = useAuth();

  const fetchIngredients = useCallback(
    async (mealType: string) => {
      const requestData: GetMealPlanResponse = {
        userId: 2023021021401001,
        mealType: `${mealType}`,
        pageNum: 1,
        pageSize: 10,
      };
      try {
        const response = await fetch("/api/daily-diet", {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: {
            Authorization: await currentUser!.getIdToken(),
          },
        });
        const data = await response.json();
        const ingredients = data.data.data.list;

        setMealId(data.data.mealId);
        setIngredientList(ingredients);
      } catch (error) {
        console.log(error);
      }
    },
    [currentUser]
  );

  // useEffect(() => {
  //   currentUser && fetchIngredients('breakfast');
  // }, [currentUser, fetchIngredients]);

  const tableData: DataType[] = [...data.result];
  useEffect(() => {
    setIngredientList(tableData);
  }, [])

  const onChange = (key: string) => {
    fetchIngredients(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "breakfast",
      label: 'Breakfast',
      children: <TableComponent mealId={mealId} tableData={ingredientList} setCalories={setTotalCalories} />,
    },
    {
      key: "lunch",
      label: 'Lunch',
      children: <TableComponent mealId={mealId} tableData={ingredientList} setCalories={setTotalCalories} />,
    },
    {
      key: "dinner",
      label: 'Dinner',
      children: <TableComponent mealId={mealId} tableData={ingredientList} setCalories={setTotalCalories} />,
    },
  ];

  return (
    <div style={{maxWidth: '1440px', margin: 'auto'}}>
      <Head>
        <title>Today&apos;s menu</title>
      </Head>
      <div className="daily-diet-header">
        <Header text={`Today's menu`} />
        <div className="daily-diet-header-calories">
          <p className="daily-diet-header-calories-target"><b>Target calories:</b> 400-500</p>
          <p className={classnames("daily-diet-header-calories-sum",
            {"warning": totalCalories > 500},
            {"good": totalCalories > 400 && totalCalories < 500})}
          >
            <b>Temporary calories sum:</b> {totalCalories}
          </p>
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default DailyDiet;
