import classNames from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Error, SubTable } from ".";
import useWindowDimensions from "./hooks/useWindowDimensions";

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
}

const TableComponent = (props: TableComponentProps) => {
  const { height, width } = useWindowDimensions();
  const { tableData, mealId } = props;

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
  
  function TableHeader() {
    return (
      <div className="table-header">
        <input type="checkbox" onChange={ handleSelectAll } checked={ isSelectAll } className={ 'table-header-checkbox' }></input>
        <div className={'table-header-title-big'}>Ingredient</div>
        <div className={'table-header-title-small'}>Calories</div>
        <div className={'table-header-title-small'}>Weight</div>
        {width > 576 && <div className={'table-header-title-small'}>Subtitution</div>}
      </div>
    )
  }

  function handleClick() {
    if (!result || result.length === 0) return;
    return router.push('/summary')
    // fetch('http://localhost:3000/ingredients', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(result)
    // })
  }

  if ( !tableData ) return <Error />

  return (
    <div>
      <TableHeader />
      {tableData && tableData?.map(( item: any, index: number ) => 
        <SubTable key={index} mealId={mealId} tableData={item} isSelectAll={isSelectAll} result={result} setResult={setResult}/>)
      }
      <div className={'done'}>
        <button onClick={handleClick} className={classNames('done-btn', {'disabled': (!result || result.length === 0)})}>Done</button>
      </div>
    </div>
  )
}

export default TableComponent;