import { Tooltip } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { TableComponentProps } from "./TableComponent";

type SubTableProps = {
  tableData: any,
  result: any,
  setResult: any,
}

const Substitution = ({ tableData, result, setResult } : SubTableProps ) => {
  const { ingredientName, calories, quantity, weight } = tableData;
  const [ischecked, setIsChecked] = useState(false);

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (!ischecked) {
      setResult([...result, tableData]);
    } else {
      setResult(result.filter((item: any) => item.ingredientName !== ingredientName));
    }

    setIsChecked(!ischecked);
  }

  useEffect(() => {
  }, []);

  return  (
    <div>
      <div className={'table-body'}>
        <div className="table-body-title-big table-body-margin-left-checkbox">
          <input type="checkbox" onChange={handleCheck} checked={ischecked} className={'table-checkbox'}></input>
          <div className={'name'}>{ingredientName}</div>
        </div>
        <div className={'table-body-title-small'}>{calories}</div>
        <div className={'table-body-title-small'}>{quantity}</div>
        <div className={'table-body-title-small'}>{weight}</div>
        <div className={'table-body-title-small table-body-btn'}></div>
      </div>
    </div>
  )
}

export default Substitution;