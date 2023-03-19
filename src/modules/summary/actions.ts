export async function get(idToken: string) {

  const response = await fetch("/api/summary", {
    method: "GET",
    headers: {
      Authorization: idToken,
    },
  });
  const data = await response.json();
  const ingredients = data.data[0];
  const meal = data.data;

  const getMealType = (mealType: String) => {
    return meal.find((item: any) => {
      if (item.meal.mealType === mealType) return item;
    });
  }

  const breakfast = getMealType("breakfast");
  const lunch = getMealType("lunch");
  const dinner = getMealType("dinner");

  return { ingredients, breakfast, lunch, dinner };
}

get.key = "/modules/summary/actions/get";