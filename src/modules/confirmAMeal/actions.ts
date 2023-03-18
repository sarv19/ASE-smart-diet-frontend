
type Ingredient = {
    ingredientId: React.Key,
    calories: number,
    quantity: number,
    weight: number
}

export type ConfirmAMealRequest = {
    mealId: number;
    ingredients: Ingredient[]
}

export async function post(args: ConfirmAMealRequest, idToken: string) {
    console.log('run here??', idToken)
    const response = await fetch("/api/confirm-a-meal", {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: idToken,
        }
    });
    const data = await response.json();
    return data;
}

post.key = "modules/confirmAMeal/actions/post";
