type GetMealPlanResponse = {
  pageNum: number;
  pageSize: number;
  mealType: string;
  mealId?: number;
};

export async function get(mealType: string, idToken: string) {
  const requestData: GetMealPlanResponse = {
    mealType: `${mealType}`,
    pageNum: 1,
    pageSize: 10,
  };

  const response = await fetch("/api/daily-diet", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      Authorization: idToken,
    },
  });
  const data = await response.json();
  const ingredients = data.data.data.list;
  const mealId = data.data.mealId;
  const totalTargetCalories = data.data.totalCalories;
  return { ingredients, mealId, totalTargetCalories };
}

get.key = "/modules/dailyDiet/actions/get";
