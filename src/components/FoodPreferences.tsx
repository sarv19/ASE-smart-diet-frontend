import { BACKEND_BASE_URL } from '@/constants';
import { useAuth } from '@/modules/auth';
import { addFoodPreferenceRequest } from '@/modules/settings/food/actions';
import { Form, Select, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { titleCase } from './utils';

const FoodPreferences = () => {
  const { t } = useTranslation('', { useSuspense: false });
  const [allIngredients, setAllIngredients] = useState<any[]>([]);
  const [preferedIngredients, setPreferedIngredients] = useState<any[]>([]);
  const [unwantedIngredients, setUnwantedIngredients] = useState<any[]>([]);
  const [allergens, setAllergens] = useState<any[]>([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    getAllIngredients();
    getFoodPreference();
  }, []);

  const transformIngredientList = (list: any) => {
    if (!list || list.length < 1) return [];
    return list.map((item: any) => (
      { label: titleCase(item.ingredientName), value: item.ingredientName, preferenceId: item.preferenceId, id: item.ingredientId}
    ))
  }

  const getAllIngredients =async () => {
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

  const getFoodPreference = async () => {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/sd/settings/queryFoodPerformance`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: currentUser?.uid,
        },
      }
    );
    const data = response.data?.data;
    setPreferedIngredients(transformIngredientList(data?.preferred));
    setUnwantedIngredients(transformIngredientList(data?.unwanted));
    setAllergens(transformIngredientList(data?.allergens));
    return data;
  };
  
  const addFoodPreference = async (
    body: addFoodPreferenceRequest
  ) => {
    const response = await fetch(`${BACKEND_BASE_URL}/sd/settings/addFoodPerformance`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:  currentUser?.uid || '',
      },
    });

    const data = await response.json();
    return data;
  };
  
  const deleteFoodPreference = async (
    body: addFoodPreferenceRequest
  ) => {
    const response = await fetch(
      `${BACKEND_BASE_URL}/sd/settings/deleteFoodPerformance`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: currentUser?.uid || '',
        },
      }
    );

    const data = await response.json();
    return data;
  };

  function getId(item: string, rank: number, remove: boolean){
    if (remove){
      switch (rank) {
        case 1:
          const preferred = preferedIngredients?.find((ingredient: any) => ingredient?.value === item);
          return preferred?.preferenceId;
        case 0:
          const unwanted = unwantedIngredients?.find((ingredient: any) => ingredient?.value === item);
          return unwanted?.preferenceId;
        case -1:
          const allergic = allergens?.find((ingredient: any) => ingredient?.value === item);
          return allergic?.preferenceId;
        default:
          break;
      }
    } else {
      const ingre = allIngredients?.find((ingredient: any) => ingredient?.value === item);
      return ingre?.id
    } 
  }

  function handleChange(item: string, rank: number, remove: boolean) {
    if (remove){
      const data: any = {
        preferenceId: getId(item, rank, remove)
      }
      deleteFoodPreference(data)
        .then(() => {
          getFoodPreference()
        })
    } else {
      const data: addFoodPreferenceRequest = {
        ingredientId: getId(item, rank, remove),
        recommendLevel: rank
      }
      addFoodPreference(data)
        .then(() => {
          getFoodPreference()
        })
    }

  }

  if (allIngredients.length == 0) return <div className="page-spinner"><Spin /></div>;

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
          label={<div>{t('Prefered Ingredients')}</div>}
          name="preferedIngredients"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={preferedIngredients}
            options={allIngredients}
            onDeselect={(e: any)=> handleChange(e, 1, true)}
            onSelect={(e: any)=> handleChange(e, 1, false)}
          />
        </Form.Item>
        <Form.Item
          label={<div>{t('Unwanted Ingredients')}</div>}
          name="unwantedIngredients"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={unwantedIngredients}
            options={allIngredients}
            onDeselect={(e: any)=> handleChange(e, 0, true)}
            onSelect={(e: any)=> handleChange(e, 0, false)}
          />
        </Form.Item>
        <Form.Item
          label={<div>{t('Allergens')}</div>}
          name="allergens"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={allergens}
            onDeselect={(e: any)=> handleChange(e, -1, true)}
            onSelect={(e: any)=> handleChange(e, -1, false)}
            options={allIngredients}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FoodPreferences;
