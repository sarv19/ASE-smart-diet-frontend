import { useAuth } from "@/modules/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Select, Spin } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { transformIngredientList } from "./utils";
import * as summaryAction from "@/modules/summary/actions";
import * as foodPreferencesAction from "@/modules/settings/foodPreferences/actions";

const FoodPreferences = () => {
  const { t } = useTranslation("", { useSuspense: false });
  const [preferedIngredients, setPreferedIngredients] = useState<any[]>([]);
  const [unwantedIngredients, setUnwantedIngredients] = useState<any[]>([]);
  const [allergens, setAllergens] = useState<any[]>([]);

  const { currentUser } = useAuth();

  const { data: allIngredients, isLoading: isLoadingIngredients } = useQuery({
    queryFn: async () =>
      summaryAction.getAllIngredients((await currentUser?.getIdToken()) || ""),
    queryKey: [currentUser?.uid],
    enabled: !!currentUser,
  });

  const { refetch } = useQuery({
    queryFn: async () =>
      foodPreferencesAction.get((await currentUser?.getIdToken()) || ""),
    queryKey: [foodPreferencesAction.get.key, currentUser],
    onSuccess: (data) => {
      setPreferedIngredients(transformIngredientList(data?.preferred));
      setUnwantedIngredients(transformIngredientList(data?.unwanted));
      setAllergens(transformIngredientList(data?.allergens));
    },
  });

  const { mutate: addFoodPreference } = useMutation({
    mutationFn: async (body) =>
      foodPreferencesAction.post((await currentUser?.getIdToken()) || "", body),
    onSuccess: () => refetch(),
  });

  const newAllIngre = transformIngredientList(allIngredients?.data);

  const { mutate: deleteFoodPreference } = useMutation({
    mutationFn: async (body) =>
      foodPreferencesAction.remove(
        (await currentUser?.getIdToken()) || "",
        body
      ),
    onSuccess: () => refetch(),
  });

  function getId(item: string, rank: number, remove: boolean) {
    if (remove) {
      switch (rank) {
        case 1:
          const preferred = preferedIngredients?.find(
            (ingredient: any) => ingredient?.value === item
          );
          return preferred?.preferenceId;
        case 0:
          const unwanted = unwantedIngredients?.find(
            (ingredient: any) => ingredient?.value === item
          );
          return unwanted?.preferenceId;
        case -1:
          const allergic = allergens?.find(
            (ingredient: any) => ingredient?.value === item
          );
          return allergic?.preferenceId;
        default:
          break;
      }
    } else {
      const ingre = newAllIngre?.find(
        (ingredient: any) => ingredient?.value === item
      );
      return ingre?.id;
    }
  }

  function handleChange(item: string, rank: number, remove: boolean) {
    if (remove) {
      const data: any = {
        preferenceId: getId(item, rank, remove),
      };
      deleteFoodPreference(data);
    } else {
      const data: any = {
        ingredientId: getId(item, rank, remove),
        recommendLevel: rank,
      };
      addFoodPreference(data);
    }
  }

  if (newAllIngre?.length == 0)
    return (
      <div className="page-spinner">
        <Spin />
      </div>
    );

  return (
    <div className="food-pref-setting">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        labelWrap
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label={<div>{t("Prefered Ingredients")}</div>}
          name="preferedIngredients"
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={preferedIngredients}
            options={newAllIngre}
            onDeselect={(e: any) => handleChange(e, 1, true)}
            onSelect={(e: any) => handleChange(e, 1, false)}
          />
        </Form.Item>
        <Form.Item
          label={<div>{t("Unwanted Ingredients")}</div>}
          name="unwantedIngredients"
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={unwantedIngredients}
            options={newAllIngre}
            onDeselect={(e: any) => handleChange(e, 0, true)}
            onSelect={(e: any) => handleChange(e, 0, false)}
          />
        </Form.Item>
        <Form.Item label={<div>{t("Allergens")}</div>} name="allergens">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={allergens}
            onDeselect={(e: any) => handleChange(e, -1, true)}
            onSelect={(e: any) => handleChange(e, -1, false)}
            options={newAllIngre}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FoodPreferences;
