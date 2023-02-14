import React, { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';

type ProgressProps = {
  percentage?: number;
  progression?: number
}
const ProgressBar = (props: ProgressProps) => {

  const { percentage = 0, progression } = props;

  const [percent, setPercent] = useState<number>(percentage);

  const increase = (input: number) => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + input;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const decline = (input: number) => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - input;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  return (
    <>
      <Progress percent={percent} />
      <Button.Group>
        <Button onClick={() => decline(10)} icon={<MinusOutlined />} />
        <Button onClick={() => increase(10)} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};

export default ProgressBar;