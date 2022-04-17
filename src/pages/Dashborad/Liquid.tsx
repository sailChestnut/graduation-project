
import { Liquid } from '@ant-design/plots';

const DemoLiquid = () => {
  const config = {
    percent: 0.65,
    shape: 'diamond',
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 68,
    },
    pattern: {
      type: 'line',
    },
  };
  return (
    <div>
      <Liquid {...config} />
    </div>
  );
};

export default DemoLiquid;