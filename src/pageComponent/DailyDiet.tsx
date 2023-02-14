import React, { useEffect, useState } from 'react';
import { Button, Table, Tabs, TabsProps } from 'antd';
import { Header, TableComponent } from '../components';

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
}

const DailyDiet: React.FC = () => {

  const [ingredientList, setIngredientList] = useState<DataType[]>();
  const [mealId, setMealId] = useState<number>(0);

  const fetchIngredients = async (mealType: string) => {
    const requestData : GetMealPlanResponse = {
      "userId": 2023021021401001,
      "mealType": `${mealType}`,
      "pageNum": 1,
      "pageSize": 10
    }
    try {
      const response = await fetch('http://3.17.69.128:8080/sd/meal/queryAMeal',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      const ingredients = data.data.data.list; 
      console.log(data);
      setMealId(data.data.mealId);
      setIngredientList(ingredients);  
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    fetchIngredients('breakfast');
  }, [])

  const onChange = (key: string) => {
    fetchIngredients(key);
  };

  // const tableData: DataType[] = [
  //   ...data.result
  // ];
  
  const items: TabsProps['items'] = [
    {
      key: 'breakfast',
      label: `Breakfast`,
      children: <TableComponent mealId={mealId} tableData={ingredientList}/>,
    },
    {
      key: 'lunch',
      label: `Lunch`,
      children: <TableComponent mealId={mealId} tableData={ingredientList}/>,
    },
    {
      key: 'dinner',
      label: `Dinner`,
      children: <TableComponent mealId={mealId} tableData={ingredientList}/>,
    },
  ];
  
  return (
    <>
      <Header text={`Today's menu`}/>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  )
};

export default DailyDiet;