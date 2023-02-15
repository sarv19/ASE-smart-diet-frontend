import { Tooltip } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Substitution from "./Substitution";

type SubTableProps = {
  tableData: any,
  isSelectAll?: boolean,
  result: any,
  setResult: any,
  mealId?: number,
}

const SubTable = ({ tableData, isSelectAll, result, setResult, mealId } : SubTableProps ) => {
  const { ingredientName, calories, quantity, weight, ingredientId } = tableData;
  const [isOpen, setIsOpen] = useState(false);
  const [ischecked, setIsChecked] = useState(isSelectAll);
  const [subtitutions, setSubtitutions] = useState<any[]>([]);

  async function handleOpen() {
    setIsOpen(!isOpen);
    const response = await fetch('/api/substitutions', {
      method: 'POST',
      body: JSON.stringify({ingredientId: ingredientId, mealId: mealId}),
    })
    const data = await response.json();
    setSubtitutions(data.data.data.list);
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (!ischecked) {
      setResult([...result, tableData]);
    } else {
      setResult(result.filter((item: any) => item.ingredientName !== ingredientName));
    }

    setIsChecked(!ischecked);
  }

  useEffect(() => {
    setIsChecked(isSelectAll);
  }, [isSelectAll]);

  return  (
    <div>
      <div className={'table-body'}>
        <input type="checkbox" onChange={handleCheck} checked={ischecked} className={'table-checkbox'}></input>
        <div className={'table-body-title-big name'}>{ingredientName}</div>
        <div className={'table-body-title-small'}>{calories}</div>
        <div className={'table-body-title-small'}>{quantity}</div>
        <div className={'table-body-title-small'}>{weight}</div>
        <button className={'table-body-title-small table-body-btn'} onClick={handleOpen}>
          <Tooltip placement="left" title={'Click to show subtitutions'}>
            <img src='static/images/chevron-down.png' className={classNames('table-body-btn-icon', { 'is-active': isOpen }) }/>
          </Tooltip>
        </button>
      </div>

      { isOpen && subtitutions && 
        subtitutions.map((item: any, index: number) => {
          return <Substitution key={index} tableData={item} result={result} setResult={setResult} />
        })
      }
    </div>
  )
}

export default SubTable;