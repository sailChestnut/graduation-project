import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return (
    <div>
      <Line {...config} style={{ margin: 40 }} />
    </div>
  );
};

export default DemoLine;