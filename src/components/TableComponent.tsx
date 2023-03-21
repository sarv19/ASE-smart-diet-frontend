import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Error, SubTable } from ".";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { useAuth } from "@/modules/auth";
import { useMutation } from "@tanstack/react-query";
import * as confirmAMeal from "@/modules/confirmAMeal/actions";
import { capitalizeFirstLetter } from "./utils";

interface TableProps {
  ingredientId: React.Key;
  ingredientName: string;
  calories: number;
  quantity: number;
  weight: number;
  substitute?: TableProps[];
}

export type TableComponentProps = {
  tableData?: TableProps[];
  mealId?: number;
  setCalories: any;
  totalTargetCalories: number;
  mealDate: string;
}

const TableComponent = (props: TableComponentProps) => {
  const { tableData, mealId, setCalories, totalTargetCalories, mealDate } = props;
  const [currentCalories, setCurrentCalories] = useState(0);
  const { t } = useTranslation('', { useSuspense: false });
  const { currentUser } = useAuth();
  const [confirmedMeal, setConfirmedMeal] = useState(mealDate ? true : false);

  const [isSelectAll, setIsSelectAll] = useState(false);
  const [result, setResult] = useState<TableProps[] | undefined>([]);

  const router = useRouter();

  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>) {
    setIsSelectAll(!isSelectAll);
  }

  useEffect(() => {
    if (isSelectAll) {
      setResult(tableData);
    } else {
      setResult([]);
    }
  }, [isSelectAll]); 

  useEffect(() => {
    if (result) {
      const calories = result.reduce<number>((currentValue: number, item: TableProps) => item.calories + currentValue, 0);
      setCalories(calories);
      setCurrentCalories(calories)
    }
  }, [result]);

  const { mutate } = useMutation<
    unknown,
    unknown,
    confirmAMeal.ConfirmAMealRequest,
    unknown
  >({
    mutationFn: async (data) => {
      currentUser && confirmAMeal.post(data, (await currentUser?.getIdToken()) || "");
    },
  });

  function handleSubmit() {
    if (!result || result.length === 0) return;
    mutate({
      mealId: mealId || 0,
      ingredients: result
    });
    setConfirmedMeal(true);
  }

  function showSummary() {
    return router.push('/summary');
  }

  function TableHeader() {
    return (
      <div className="table-header">
        <input type="checkbox" onChange={ handleSelectAll } checked={ isSelectAll } className={ 'table-header-checkbox' }></input>
        <div className={'table-header-title-big'}>{t('Ingredient')}</div>
        <div className={'table-header-title-small'}>{t('Calories')} (kcals)</div>
        <div className={'table-header-title-small'}>{t('Weight')} (gr)</div>
        <div className={'table-header-title-small'}>{t('Subtitution')}</div>
      </div>
    )
  }

  function IngredientList(ingredients: TableProps, key: number) {
    return (
      <div className='ingredients-lists' key={key}>
        <div className='ingredients-lists-name'>{ capitalizeFirstLetter(t(ingredients.ingredientName)) }</div>
        <div className='ingredients-lists-weight'>{ ingredients.weight } gr</div>
      </div>
    )
  }

  if ( !tableData ) return <Error />

  if (confirmedMeal) return (
    <div className='ingredients'>
      <div className='ingredients-title'>{ t('Ingredients')}</div>
      { result && result?.map(( item: any, index: number ) =>
          IngredientList(item, index) 
        )
      }
      { result?.length == 0 && tableData && tableData?.map(( item: any, index: number ) =>
            IngredientList(item, index)
        )
      }
      <div className={'done'}>
          <button onClick={showSummary} className={'done-btn'}>{t('Show summary')}</button>
        </div>
    </div>
  )
  
  return (
    <div>
      <div className="daily-diet-header-calories">
          <p className="daily-diet-header-calories-target">
            <b>{t("Target calories")}: {totalTargetCalories}</b>
          </p>
          <p
            className={classNames(
              "daily-diet-header-calories-sum",
              { warning: currentCalories > totalTargetCalories + 20 },
              { good: currentCalories > totalTargetCalories - 20 && currentCalories < totalTargetCalories + 19 }
            )}
          >
            <b>{t("Temporary calories sum")}: {currentCalories}</b>
          </p>
        </div>
      <TableHeader />
      {tableData && tableData?.map(( item: any, index: number ) => 
        <SubTable key={index} mealId={mealId} tableData={item} isSelectAll={isSelectAll} result={result} setResult={setResult}/>)
      }
      <div className={'done'}>
        <button onClick={handleSubmit} className={classNames('done-btn', {'disabled': (!result || result.length === 0)})}>{t('Done')}</button>
      </div>
    </div>
  )
}

export default TableComponent;