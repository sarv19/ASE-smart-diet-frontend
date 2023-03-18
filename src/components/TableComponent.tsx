import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Error, SubTable } from ".";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { useAuth } from "@/modules/auth";
import { useMutation } from "@tanstack/react-query";
import * as confirmAMeal from "@/modules/confirmAMeal/actions";

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
}

const TableComponent = (props: TableComponentProps) => {
  const { tableData, mealId, setCalories, totalTargetCalories } = props;
  const [currentCalories, setCurrentCalories] = useState(0);
  const { t } = useTranslation('', { useSuspense: false });
  const { currentUser } = useAuth();

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

  function handleClick() {
    if (!result || result.length === 0) return;
    mutate({
      mealId: mealId || 0,
      ingredients: result
    })
  }

  if ( !tableData ) return <Error />
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
        <button onClick={handleClick} className={classNames('done-btn', {'disabled': (!result || result.length === 0)})}>{t('Done')}</button>
      </div>
    </div>
  )
}

export default TableComponent;