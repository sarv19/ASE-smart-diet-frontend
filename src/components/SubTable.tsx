import { useAuth } from "@/modules/auth";
import { Tooltip } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";

import useWindowDimensions from "./hooks/useWindowDimensions";
import Substitution from "./Substitution";

type SubTableProps = {
  tableData: any;
  isSelectAll?: boolean;
  result: any;
  setResult: any;
  mealId?: number;
};

const SubTable = ({
  tableData,
  isSelectAll,
  result,
  setResult,
  mealId,
}: SubTableProps) => {
  const { height, width } = useWindowDimensions();

  const { ingredientName, calories, quantity, weight, ingredientId } =
    tableData;
  const [isOpen, setIsOpen] = useState(false);
  const [ischecked, setIsChecked] = useState(isSelectAll);
  const [subtitutions, setSubtitutions] = useState<any[]>([]);

  const { currentUser } = useAuth();

  async function handleOpen() {
    setIsOpen(!isOpen);
    // TO DO: use real data

    const response = await fetch("/api/substitutions", {
      headers: {
        Authorization: await currentUser!.getIdToken(),
      },
      method: "POST",
      body: JSON.stringify({ ingredientId: ingredientId, mealId: mealId }),
    });
    const data = await response.json();
    // const data = [
    //   {
    //     "ingredientId": 1,
    //     "ingredientName": "Pork loin",
    //     "calories": 185,
    //     "quantity": 1,
    //     "weight": 150,
    //   },
    //   {
    //     "ingredientId": 2,
    //     "ingredientName": "Lamb chop",
    //     "calories": 205,
    //     "quantity": 1,
    //     "weight": 130,
    //   },
    // ]
    setSubtitutions(data?.data?.data?.list);
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (!ischecked) {
      setResult([...result, tableData]);
    } else {
      setResult(
        result.filter((item: any) => item.ingredientName !== ingredientName)
      );
    }

    setIsChecked(!ischecked);
  }

  useEffect(() => {
    setIsChecked(isSelectAll);
  }, [isSelectAll]);

  return (
    <div>
      <div className={"table-body"}>
        <input
          type="checkbox"
          onChange={handleCheck}
          checked={ischecked}
          className={"table-checkbox"}
        ></input>
        <div className={"table-body-title-big name"} onClick={handleOpen}>{ingredientName}</div>
        <div className={"table-body-title-small"} onClick={handleOpen}>{calories}</div>
        <div className={"table-body-title-small"} onClick={handleOpen}>{weight}</div>
        <button
          className={"table-body-title-small table-body-btn"}
          onClick={handleOpen}
        >
          <Tooltip placement="left" title={"Click to show subtitutions"}>
            <img
              src="static/images/chevron-down.png"
              className={classNames("table-body-btn-icon", {
                "is-active": isOpen,
              })}
            />
          </Tooltip>
        </button>
      </div>

      {isOpen &&
        subtitutions &&
        subtitutions?.map((item: any, index: number) => {
          return (
            <Substitution
              key={index}
              tableData={item}
              result={result}
              setResult={setResult}
            />
          );
        })}
    </div>
  );
};

export default SubTable;
