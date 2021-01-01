import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';

// TODO 메인 화면 오른쪽 영역으로 추가할 기능 설계 및 디자인 개선 필요
const FunctionalContainer = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Search" />
          <Tab label="Attach" />
        </Tabs>
      </Paper>
      <div>functional container</div>
    </div>
  );
};

export default FunctionalContainer;
