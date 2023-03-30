export async function get(dateBefore: any, idToken: string) {
  const response = await fetch(`/api/summary?dateBefore=${dateBefore?.day}`, {
    method: "GET",
    headers: {
      Authorization: idToken,
    },
  });
  const data = await response.json();
  const ingredients = data.data[0];
  const meal = data.data?.summary;
  const userTarget = data.data?.userTarget;

  const getMealType = (mealType: String) => {
    return meal.find((item: any) => {
      if (item.meal.mealType === mealType) return { item, ingredients};
    });
  }

  const breakfast = getMealType("breakfast");
  const lunch = getMealType("lunch");
  const dinner = getMealType("dinner");

  return { ingredients, breakfast, lunch, dinner, userTarget };
}

export async function getAllIngredients(idToken: string) {
  const response = await fetch("/api/summary", {
    method: "POST",
    headers: {
      Authorization: idToken,
    },
  });
  const data = await response.json();
  return { data };
}

get.key = "/modules/summary/actions/get";
getAllIngredients.key = "/modules/summary/actions/getAllIngredients";
